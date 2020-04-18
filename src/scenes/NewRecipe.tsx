import React from 'react';

import Typography from '@material-ui/core/Typography/Typography';
import Container from '@material-ui/core/Container/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AppContext } from 'services/AppContext';

import { HeaderBorder } from '../components/Border/Border';

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2, 5),
    color: 'white',
    fontFamily: 'Patrick Hand',
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
  },
}));

const NewRecipe: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).sendPageView();
  }, []);
  const appContext = React.useContext(AppContext);
  const classes = useStyles();
  const [height] = React.useState<string>('2700px');
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // React.useEffect(() => {
  //   console.log(iframeRef.current?.contentWindow?.scrollY);
  //   if (iframeRef) setHeight(`${iframeRef.current?.contentWindow?.scrollY}px`);
  //   // obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  // });

  // const handleLoad = (event: React.SyntheticEvent<HTMLIFrameElement, Event>): void => {
  //   // if (iframeRef && iframeRef.current) console.log(iframeRef.current.contentWindow?.document.body.scrollHeight);
  // };

  return (
    <>
      <Container maxWidth="sm">
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            <HeaderBorder backgroundColor="#76b82a" text={`Új recept rögzítése`} fontSize={30} />
            {/* Ételek {currentPage} */}
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Ügyelj a pontosságra!
          </Typography>
        </div>
      </Container>
      <iframe
        id="iframe"
        ref={iframeRef}
        src={appContext?.appConstants?.newRecipeFormUrl + '?embedded=true'}
        // width="640"
        // height="2082"
        width="100%"
        height={height}
        // height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        // onLoad={handleLoad}
        title="Új recept hozzáadása"
      >
        Betöltés…
      </iframe>
    </>
  );
};

export default NewRecipe;
