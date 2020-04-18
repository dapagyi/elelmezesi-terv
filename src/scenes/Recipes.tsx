import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';

import { HeaderBorder } from '../components/Border/Border';
import RecipeGrid from 'components/Recipes/RecipeGrid';
import fetchSpreadsheet from 'services/fetchSpreadsheet';
import { AppContext } from 'services/AppContext';
import { Recipe } from 'interfaces/Recipe';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const RecipeList: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).sendPageView();
  }, []);
  const appContext = React.useContext(AppContext);

  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const RECIPES_PER_PAGE = 9;

  React.useEffect(() => {
    let mounted = true;
    // const spreadsheetId = '14m9QUg6EUBP7Nxz_1DyfnSRy3akgjcz6nZYKMpPVkL4';
    // const gid = '1653810923';
    const query = `select A, B, H, L, M where B is not null and M = TRUE order by A desc label B 'Lehetséges ételek'`;
    const headers = 1;

    (async (): Promise<void> => {
      // const table = await fetchSpreadsheet(query, spreadsheetId, gid, headers);
      if (appContext && appContext.appConstants) {
        const table = await fetchSpreadsheet(
          query,
          appContext.appConstants.spreadsheetId,
          appContext.appConstants.tableIds.recipesSheet,
          headers,
        );
        if (!mounted) return;
        const recipes: Recipe[] = [];
        table.forEach(row => {
          recipes.push({
            addDate: row[0],
            name: row[1],
            imageLink: row[2],
          });
        });
        setRecipes(recipes);
        setIsLoading(false);
      }
    })();

    return (): void => {
      mounted = false;
    };
  }, [appContext]);

  const classes = useStyles();

  return (
    <>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            <HeaderBorder backgroundColor="#5c3896" text={`Cserkésztábori ételek`} fontSize={30} />
            {/* Ételek {currentPage} */}
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Itt találod mindazokat a recepteket, amelyek az élelmezési tervedben szerepelnek. További információért
            olvasd el az <Link to="/utmutato">útmutatót!</Link>
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link to="/uj-recept" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="primary">
                    Új étel rögzítése
                  </Button>
                </Link>
              </Grid>
              {/* <Grid item>
                <Button variant="outlined" color="primary">
                  Secondary action
                </Button>
              </Grid> */}
            </Grid>
          </div>
        </Container>
      </div>
      <RecipeGrid isLoading={isLoading} recipes={recipes} recipesPerPage={RECIPES_PER_PAGE} />
    </>
  );
};

export default RecipeList;
