import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid/Grid';
import MPagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  pagination: {
    padding: theme.spacing(3, 0, 3),
  },
}));

const Pagination: React.FC<{
  currentPage: number;
  numOfPages: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}> = props => {
  const classes = useStyles();

  return (
    <Grid className={classes.pagination} container direction="column" justify="center" alignItems="center">
      <MPagination page={props.currentPage} onChange={props.onChange} color="primary" count={props.numOfPages} />
    </Grid>
  );
};

export default Pagination;
