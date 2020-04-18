import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography/Typography';
import { HeaderBorder } from 'components/Border/Border';
import { Link } from 'react-router-dom';
import { AppContext } from 'services/AppContext';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 2),
  },
}));

export const MustLoadBeforeUse: React.FC = props => {
  const appContext = React.useContext(AppContext);
  return <>{appContext && appContext.appConstants ? props.children : <ErrorScreen />}</>;
};

const ErrorScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            <HeaderBorder backgroundColor="#da0812" text={`Probléma akadt`} fontSize={30} />
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Ennek a funkciónak a használatához be kell töltened az élelmezési tervedet. Erre a{' '}
            <Link to="/">kezdőoldalon</Link> van lehetőséged. További információért olvasd el az{' '}
            <Link to="/utmutato">útmutatót!</Link>
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default MustLoadBeforeUse;
