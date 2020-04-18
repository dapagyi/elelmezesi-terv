/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';

import makeStyles from '@material-ui/core/styles/makeStyles';
// import Button from '@material-ui/core/Button';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import LocalDiningIcon from '@material-ui/icons/LocalDining';

import { AppContext } from 'services/AppContext';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  button: {
    padding: theme.spacing(2),
  },
  navItem: {
    color: 'black',
    // textTransform: 'uppercase',
  },
}));

const AppBar: React.FC = () => {
  const classes = useStyles();
  const appContext = React.useContext(AppContext);

  return (
    <>
      <Navbar style={{ backgroundColor: '#91cc8d' }} expand="lg">
        <Navbar.Brand as={Link} to="/">
          <IconButton edge="start" className={(classes.icon, classes.navItem)} color="inherit" aria-label="menu">
            <LocalDiningIcon />
          </IconButton>
          <span className={classes.navItem}>{appContext?.appConstants?.title || 'Élelmezési terv'}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              <span className={classes.navItem}>Kezdőoldal</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/utmutato">
              <span className={classes.navItem}>Útmutató</span>
            </Nav.Link>
            {appContext && appContext.appConstants ? (
              <>
                <Nav.Link as={Link} to="/elelmezesi-terv">
                  <span className={classes.navItem}>Élelmezési terv</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/receptkonyv">
                  <span className={classes.navItem}>Receptkönyv</span>
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Recept neve" className="mr-sm-2" />
            <Button
              variant="light"
              // variant="outline-success"
            >
              Keresés
            </Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    </>
  );

  // return (
  //   <>
  //     <MaterialAppBar style={{ backgroundColor: '#72bf44', flexGrow: 1 }} position="relative">
  //       <Toolbar>
  //         {/* <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu">
  //           <LocalDiningIcon />
  //         </IconButton>
  //         <Typography variant="h6" color="inherit" noWrap>
  //           <b>GH</b>
  //         </Typography>
  //         <Button color="inherit">Login</Button> */}
  //         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
  //           <LocalDiningIcon />
  //           {/* <MenuIcon /> */}
  //         </IconButton>
  //         <Typography variant="h6" className={classes.title}>
  //           GH
  //         </Typography>
  //         <Button className={classes.button} color="inherit">
  //           Útmutató
  //         </Button>
  //         <Link to="/receptkönyv">
  //           <Button className={classes.button} color="inherit">
  //             Receptkönyv
  //           </Button>
  //         </Link>
  //         <Button className={classes.button} color="inherit">
  //           Tábori élelmezési terv
  //         </Button>
  //       </Toolbar>
  //     </MaterialAppBar>
  //   </>
  // );
};

export default AppBar;
