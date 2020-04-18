import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography/Typography';
import Container from '@material-ui/core/Container/Container';
import { HeaderBorder } from 'components/Border/Border';
import { Paragraph } from 'components/common/Paragraph';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Badge from 'react-bootstrap/Badge';
import fetchSpreadsheet from 'services/fetchSpreadsheet';
import { RecipePage } from 'interfaces/Recipe';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import { getIngredients, simplifyUnit } from 'services/getIngredients';
import { UserPreferencies } from 'services/AppContext';
import { AppContext } from 'services/AppContext';
import Chart from 'react-google-charts';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 2),
  },
}));

interface TParams {
  recipe: string;
}
//asd
enum PageStatus {
  LOADING,
  SUCCESS,
  ERROR,
}

const Recipe: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).sendPageView();
  }, []);
  const appContext = React.useContext(AppContext);
  const params = useParams<TParams>();
  const classes = useStyles();

  const [pageStatus, setPageStatus] = React.useState<PageStatus>(PageStatus.LOADING);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [numOfGuests, setNumOfGuests] = React.useState<number>(
    appContext?.userPreferencies.getUserPreferencies.numberOfGuests || 10,
  );
  const [recipe, setRecipe] = React.useState<RecipePage>();

  const loadingMessage = 'Betöltés...';

  const testColors = ['#72bf44', '#5c3896', '#f39200', '#0075bf', '#da0812', '#5b2919', '#009a93'];
  const colorBasedOnNumber = (number: number): string => {
    return testColors[number % testColors.length];
  };

  const themeColor = colorBasedOnNumber(params.recipe.length);

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    if (event.currentTarget.value) {
      const N = parseInt(event.currentTarget.value);
      setNumOfGuests(N);
      if (appContext)
        appContext.userPreferencies.setUserPreferencies((prevState: UserPreferencies) => {
          return {
            ...prevState,
            numberOfGuests: numOfGuests,
          };
        });
    }
  };

  // React.useEffect(() => {
  //   appContext?.userPreferencies.setUserPreferencies((prevState: UserPreferencies) => {
  //     return {
  //       ...prevState,
  //       numberOfGuests: numOfGuests,
  //     };
  //   });
  // }, [numOfGuests]);

  React.useEffect(() => {
    let mounted = true;
    setPageStatus(PageStatus.LOADING);
    setErrorMessage('');
    const spreadsheetId = '14m9QUg6EUBP7Nxz_1DyfnSRy3akgjcz6nZYKMpPVkL4';
    const gid = '1653810923';
    const query = `select A, B, C, D, E, F, G, H, L, Q, R, I, J, S, T, U, V where B = '${params.recipe}'`;
    const headers = 1;

    (async (): Promise<void> => {
      try {
        const data = await fetchSpreadsheet(query, spreadsheetId, gid, headers);
        if (!mounted) return;
        if (data.length > 0) {
          const recipeData = data[0];
          setRecipe({
            addDate: recipeData[0],
            name: recipeData[1],
            time: recipeData[2],
            ingredients: getIngredients(recipeData[3]),
            instructions: recipeData[4],
            portions: parseInt(recipeData[5]),
            tools: recipeData[6],
            imageLink: recipeData[7],
            addedBy: recipeData[8],
            price: +recipeData[9],
            properties: {
              energy: +recipeData[10],
              protein: +recipeData[13],
              carbohydrate: +recipeData[14],
              fat: +recipeData[15],
              water: +recipeData[16],
            },
            source: recipeData[11],
            otherParams: recipeData[12],
          });
          console.log(getIngredients(recipeData[3]));
          // setIsLoading(false);
          setPageStatus(PageStatus.SUCCESS);
        } else {
          setErrorMessage(`Nem szerepel recept "${params.recipe}" néven a táblázatban.`);
          setPageStatus(PageStatus.ERROR);
        }
      } catch (error) {
        setPageStatus(PageStatus.ERROR);
        setErrorMessage('Valószínűleg a táblázattal van probléma. Ha biztosan nem hibáztál, keresd fel Dávidot.');
        console.log(error);
      }
    })();

    return (): void => {
      mounted = false;
    };
  }, [params.recipe]);

  // console.log(params.id);

  const titleText = (status: PageStatus): string => {
    switch (status) {
      case PageStatus.SUCCESS:
        return `${params.recipe} recept`;
      case PageStatus.LOADING:
        return loadingMessage;
      case PageStatus.ERROR:
        return 'Hiba';
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.heroContent}>
          <Typography variant="h3" align="center" gutterBottom>
            <HeaderBorder align="center" backgroundColor={themeColor} text={titleText(pageStatus)} fontSize={30} />
          </Typography>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Link to="/receptkonyv" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">
                  Receptkönyv
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
        {pageStatus === PageStatus.SUCCESS ? (
          <>
            <Paragraph backgroundColor={themeColor} title="Elkészítés">
              {recipe ? (
                <>
                  <p>
                    Az eredeti recept <b>{recipe.portions} személyre</b> szól.
                  </p>
                  <ol style={{ padding: '0 0 0 20px' }}>
                    {recipe.instructions.split('\n').map((section, index) => (
                      <li key={index}>
                        {section}
                        <br />
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                ''
              )}
            </Paragraph>
            <Paragraph backgroundColor={themeColor} title="Alapanyagok">
              Hány főre szeretnéd látni a szükséges mennyiségeket?
              <br />
              <br />
              <InputGroup className="mb-3" style={{ maxWidth: '121px' }}>
                <FormControl
                  // placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  type="number"
                  defaultValue={numOfGuests}
                  onChange={handleChange}
                  min={1}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">fő</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <br />
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Alapanyag</th>
                    <th>Mennyiség {recipe?.portions} főre</th>
                    {recipe?.portions !== 1 ? <th>Mennyiség 1 főre</th> : <></>}
                    <th>Mennyiség {numOfGuests} főre</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe?.ingredients.ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{ingredient.name}</td>
                      <td>{simplifyUnit(ingredient.amount, ingredient.unit)}</td>
                      {recipe?.portions !== 1 ? (
                        <td>{simplifyUnit(ingredient.amount / (recipe?.portions || 1), ingredient.unit)}</td>
                      ) : (
                        <></>
                      )}
                      <td>
                        {simplifyUnit((ingredient.amount * numOfGuests) / (recipe?.portions || 1), ingredient.unit)}
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                    <td>1</td>
                    <td>csirkemellfilé egy tonhalas szendviccsel</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>*/}
                </tbody>
                <thead>
                  <tr>
                    <th>∑</th>
                    <th>Energiabevitel</th>
                    {recipe?.portions !== 1 ? <th></th> : <></>}
                    <th>{simplifyUnit(recipe?.properties.energy || 0, 'kcal')} *</th>
                    <th></th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>∑</th>
                    <th>Költség</th>
                    {recipe?.portions !== 1 ? <th></th> : <></>}
                    <th>{simplifyUnit(recipe?.price || 0, 'Ft')} *</th>
                    <th>{simplifyUnit((recipe?.price || 0) * numOfGuests, 'Ft')} *</th>
                  </tr>
                </thead>
              </Table>
              <i>
                * Csak a táblázatban, az &quot;Alapanyagok&quot; munkalapon szereplő hozzávalók lettek figyelembe véve a
                számítás során.
              </i>
            </Paragraph>
            <Paragraph backgroundColor={themeColor} title="Tápanyagtartalom">
              <Chart
                width="max"
                height={'250px'}
                chartType="PieChart"
                loader={<div>Diagram betöltése...</div>}
                data={[
                  ['Tápanyag', 'Tápanyagtartalom (kcal-ban)'],
                  ['Fehérje', recipe?.properties.protein],
                  ['Szénhidrát', recipe?.properties.carbohydrate],
                  ['Zsír', recipe?.properties.fat],
                  ['Víz', recipe?.properties.water],
                  [
                    'Egyéb vagy a munkalapon nem szereplő',
                    (recipe?.properties.energy || 0) -
                      (recipe?.properties.protein || 0) +
                      (recipe?.properties.carbohydrate || 0) +
                      (recipe?.properties.fat || 0) +
                      (recipe?.properties.water || 0),
                  ],
                ]}
                options={{
                  title: 'Tápanyagok energiatartalmának megoszlása (kcal)',
                  backgroundColor: '#fafafa',
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </Paragraph>
            {recipe && recipe.tools ? (
              <Paragraph backgroundColor={themeColor} title="Eszközök">
                {recipe.tools.split(', ').map((tool, index) => (
                  <React.Fragment key={'tool' + index}>
                    <Badge style={{ background: colorBasedOnNumber(index + params.recipe.length) }} variant="primary">
                      {tool}
                    </Badge>{' '}
                  </React.Fragment>
                ))}
              </Paragraph>
            ) : (
              <></>
            )}
            {recipe && recipe.otherParams !== '' ? (
              <>
                <Paragraph backgroundColor={themeColor} title="További paraméterek">
                  {recipe.otherParams.split('\n').map((row, index) => {
                    return <p key={'otherParams' + index}>{row}</p>;
                  })}
                </Paragraph>
              </>
            ) : (
              <></>
            )}
            {recipe ? (
              <>
                <p>
                  <b>Forrás: </b>
                  {recipe.source}
                </p>
                <p>
                  <i>
                    Rögzítette: {recipe.addedBy} {recipe.addDate}
                  </i>
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        ) : pageStatus === PageStatus.ERROR ? (
          <>
            {errorMessage ? (
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {errorMessage}
              </Typography>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Recipe;
