import React from 'react';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Link from '@material-ui/core/Link';

import footernyakkendo from './footer_nyakkendő.svg';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    justifyContent: 'center',
  },
}));

function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {/* {'Copyright © '} */}
      <Link color="inherit" href="https://dapagyi.github.io/">
        dapagyi.github.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Apagyi Dávid
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          <Link color="inherit" href="mailto:apagyi.david+dev@gmail.com?subject=Élelmezési terv weboldal">
            apagyi.david@gmail.com
          </Link>
        </Typography>
        <Copyright />
        {/* <Box justifyContent="center"> */}
        <img
          src={footernyakkendo}
          style={{ width: `${121 + 29}px`, display: 'block', margin: '8px auto 0 auto' }}
          alt="segédtiszti vándornyakkendő"
          title="STVK 28/C"
        />
        {/* </Box> */}
      </footer>
    </>
  );
};

export default Footer;
