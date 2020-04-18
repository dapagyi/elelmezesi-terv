import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import border from './border_purple.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Border } from './components/Border/Border';
// import { HashRouter as Router, , Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/layout/Footer';
import AppBar from './components/layout/AppBar';
import Homepage from './scenes/Homepage';
import NewRecipe from './scenes/NewRecipe';
import RecipeList from './scenes/Recipes';
import Recipe from './scenes/Recipe';
import Manual from './scenes/Manual';
import EatingPlan from './scenes/EatingPlan';
import MustLoadBeforeUse from './scenes/MustLoadBeforeUse';
import { AppProvider } from 'services/AppContext';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  main: {
    flex: '1 0 auto',
    // backgroundImage: `url(${liliom})`,
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundAttachment: 'fixed',
    // más:
    // backgroundImage: `url(${nyakkendo})`,
    // backgroundRepeat: 'repeat',
    // backgroundAttachment: 'fixed',
  },
}));

// Listen for changes to the current location.
// history.listen((location, action) => {
//   // location is an object like window.location
//   console.log(action, location.pathname, location.state);
// });

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Router basename={`/`}>
        <AppProvider>
          <AppBar />
          <main className={classes.main}>
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/utmutato">
                <Manual />
              </Route>
              <Route exact path="/elelmezesi-terv">
                <MustLoadBeforeUse>
                  <EatingPlan />
                </MustLoadBeforeUse>
              </Route>
              <Route exact path="/receptkonyv">
                <MustLoadBeforeUse>
                  <RecipeList />
                </MustLoadBeforeUse>
              </Route>
              <Route exact path="/recept/:recipe">
                <MustLoadBeforeUse>
                  <Recipe />
                </MustLoadBeforeUse>
              </Route>
              <Route exact path="/uj-recept">
                <MustLoadBeforeUse>
                  <NewRecipe />
                </MustLoadBeforeUse>
              </Route>
              <Route>
                {/* <Button>asd</Button> */}
                <p className={classes.main}>Ez az oldal nem létezik.</p>
              </Route>
            </Switch>
          </main>
        </AppProvider>
      </Router>
      <Footer />
    </>
  );
};

export default App;
