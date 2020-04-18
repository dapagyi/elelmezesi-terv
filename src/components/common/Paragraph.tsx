import React from 'react';

import Typography from '@material-ui/core/Typography/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { HeaderBorder } from '../Border/Border';

const useStyles = makeStyles(theme => ({
  header: {
    marginLeft: theme.spacing(-3),
  },
  text: {
    fontFamily: 'Titillium Web',
    marginBottom: '30px',
  },
}));

export const Paragraph: React.FC<{ title: string; backgroundColor: string }> = props => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.header} variant="h3" gutterBottom>
        <HeaderBorder align="left" backgroundColor={props.backgroundColor} text={props.title} fontSize={22} />
      </Typography>
      <Typography className={classes.text} variant={'body1'} align="justify" component="div">
        {props.children}
      </Typography>
    </>
  );
};
