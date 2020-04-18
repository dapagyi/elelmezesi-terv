import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import CardActions from '@material-ui/core/CardActions/CardActions';
import Button from '@material-ui/core/Button/Button';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';

import { Recipe } from 'interfaces/Recipe';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

type RecipeGridProps = {
  isLoading: boolean;
  recipes: Recipe[];
  recipesPerPage: number;
};

const RecipeGrid: React.FC<RecipeGridProps> = props => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const classes = useStyles();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setCurrentPage(value);
  };

  const ConfiguredPagination: React.FC = () => (
    <Pagination
      currentPage={currentPage}
      numOfPages={Math.ceil(props.recipes.length / props.recipesPerPage)}
      onChange={handleChange}
    />
  );

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <ConfiguredPagination />
      <Grid container spacing={4}>
        {!props.isLoading ? (
          <>
            {props.recipes
              .slice(
                (currentPage - 1) * props.recipesPerPage,
                (currentPage - 1) * props.recipesPerPage +
                  Math.min(props.recipes.length - (currentPage - 1) * props.recipesPerPage, props.recipesPerPage),
              )
              .map(recipe => (
                <Grid item key={recipe.addDate} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia} image={recipe.imageLink} title={recipe.name} />
                    <CardContent className={classes.cardContent}>
                      <Typography style={{ fontFamily: 'Patrick Hand' }} gutterBottom variant="h5" component="p">
                        {/* {randomTestElement(testTitles)} */}
                        {recipe.name}
                      </Typography>
                      {/* <Typography>This is a media card. You can use this section to describe the content.</Typography> */}
                    </CardContent>
                    <CardActions>
                      <Link to={`/recept/${recipe.name}`} style={{ textDecoration: 'none', width: '100%' }}>
                        <Button fullWidth={true} size="small" color="primary">
                          Megtekintés
                        </Button>
                      </Link>
                      {/* <Button size="small" color="primary">Edit</Button> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </>
        ) : (
          <>
            {Array.apply(0, Array(6)).map((el, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Skeleton variant="rect" height={121 * 1.21 * 1.21 * 1.21} />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </Grid>
            ))}
          </>
        )}
        <ConfiguredPagination />
      </Grid>
    </Container>
  );
};

export default RecipeGrid;
