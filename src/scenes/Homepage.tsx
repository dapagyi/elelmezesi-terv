import React from 'react';
import { Link } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import Container from '@material-ui/core/Container/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

// import Fade from 'react-bootstrap/Fade';

import { Border, HeaderBorder } from '../components/Border/Border';
import { AppContext } from 'services/AppContext';

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2, 5),
    color: 'white',
    fontFamily: 'Patrick Hand',
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  },
}));

// enum PageStatus {
//   START,
//   FIRST_FETCHING,
//   LOADING,
//   SUCCESS,
//   ERROR,
// }

enum PageStatus {
  START,
  FETCHING,
  SUCCESS,
  ERROR,
}

const Homepage: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).sendPageView('Kezdőoldal');
  }, []);
  const appContext = React.useContext(AppContext);

  // const inputRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const initPageStatus = appContext && appContext.appConstants ? PageStatus.SUCCESS : PageStatus.START;
  const [pageStatus, setPageStatus] = React.useState<PageStatus>(initPageStatus);
  const [isLoadingDemoLink, setIsLoadingDemoLink] = React.useState<boolean>(false);
  const [isValidationErrorVisible, setIsValidationErrorVisible] = React.useState<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement & Button>(null);

  const classes = useStyles();

  const demoSpreadsheetLink =
    'https://docs.google.com/spreadsheets/d/14m9QUg6EUBP7Nxz_1DyfnSRy3akgjcz6nZYKMpPVkL4/edit#gid=1773205140';
  const loadDemo = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    setInputValue(demoSpreadsheetLink);
    setIsValidationErrorVisible(false);
    setIsLoadingDemoLink(true);
  };

  React.useEffect(() => {
    if (isLoadingDemoLink) {
      if (buttonRef !== null && buttonRef.current !== null) {
        buttonRef.current.click();
        buttonRef.current.focus();
      }
      setIsLoadingDemoLink(false);
    }
  }, [isLoadingDemoLink]);

  const regExp = new RegExp(/^https:\/\/docs.google.com\/spreadsheets\/d\/(.+)\/edit#gid=(\d+)$/);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    const matches = event.target.value.match(regExp);
    setIsValidationErrorVisible(!matches);
  };

  const submit = (/*event: React.MouseEvent<HTMLButtonElement>*/): void => {
    const data = inputValue.match(regExp);
    if (data && data.length >= 2) {
      // console.log(data);
      setPageStatus(PageStatus.FETCHING);
      if (appContext) {
        (async function(): Promise<void> {
          await appContext.initializeApp({
            spreadsheetId: data[1],
            gid: data[2],
            onError: _errorMessage => {
              console.log('Hiba: ', _errorMessage);
              setErrorMessage(_errorMessage);
              setPageStatus(PageStatus.ERROR);
            },
          });
          setPageStatus(PageStatus.SUCCESS);
          // console.log('A cím: ', fetchedTitle);
        })();
      }
      // if (pageStatus !== PageStatus.FIRST_FETCHING && pageStatus !== PageStatus.LOADING) {
      // setPageStatus(PageStatus.START);
      // const data = inputValue.match(regExp);
      // if (data && data.length >= 2) {
      //   // console.log(data);
      //   (async function(): Promise<void> {
      //     let tries = 1;
      //     const maxTries = 3;
      //     const wait = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
      //     let shouldEnd = false;
      //     setPageStatus(PageStatus.FIRST_FETCHING);
      //     do {
      //       console.log(`try #${tries} with pageStatus ${pageStatus}`);
      //       try {
      //         await contextValue.init({
      //           spreadsheetId: data[1],
      //           gid: data[2],
      //           onStart: title => {
      //             if (title) {
      //               console.log('The title is: ', title);
      //               setTitle(title);
      //               setPageStatus(PageStatus.LOADING);
      //             }
      //           },
      //         });
      //         setPageStatus(PageStatus.SUCCESS);
      //         shouldEnd = true;
      //         // console.log(result);
      //       } catch (e) {
      //         if (tries < maxTries) {
      //           console.log('Error during fetching. Try again.', e);
      //           // console.log(e);
      //           await wait(1000);
      //         } else {
      //           console.log('End with error.');
      //           shouldEnd = true;
      //           setPageStatus(PageStatus.ERROR);
      //         }
      //       }
      //     } while (++tries <= maxTries && pageStatus !== PageStatus.SUCCESS && !shouldEnd);
      //     console.log('loop end');
      //   })();
      // }
    }
  };

  const valueBasedOnPageStatus = <T extends unknown>(values: T[]): T => {
    return values[pageStatus];
  };

  const Details: React.FC = () =>
    pageStatus !== PageStatus.START ? (
      <>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          <HeaderBorder
            backgroundColor={valueBasedOnPageStatus<string>([
              '', // nem fordul elő
              '#f39200',
              '#76b82a',
              '#da0812',
            ])}
            text={valueBasedOnPageStatus<string>([
              '', // nem fordul elő
              `Betöltés...`,
              `"${appContext?.appConstants?.title}" sikeresen betöltve!`,
              `Hiba!`,
            ])}
            fontSize={22}
          />
        </Typography>
        {pageStatus === PageStatus.ERROR ? <>{errorMessage}</> : <></>}
      </>
    ) : (
      <></>
    );

  return (
    <>
      <Container maxWidth="sm">
        <div className={classes.heroContent}>
          <Border backgroundColor="#158e30">
            <Typography
              className={classes.header}
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Élelmezési terv
            </Typography>
          </Border>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Itt tudod betölteni a <b>szabályos</b> formátumú élelmezési tervedet. További információért olvasd el az{' '}
            <Link to="/utmutato">útmutatót!</Link>
          </Typography>
          <InputGroup className="mb-1">
            <FormControl
              // ref={inputRef}
              value={inputValue}
              onChange={handleChange}
              placeholder="Google táblázat linkje"
              aria-label="Google táblázat linkje"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button ref={buttonRef} onClick={submit} variant="outline-secondary">
                Betöltés
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <p
            className="text-danger mb-0"
            style={{ textAlign: 'justify', visibility: isValidationErrorVisible ? 'visible' : 'hidden' }}
          >
            A beillesztett linknek a {`'https://docs.google.com/spreadsheets/d/(...)/edit#gid=(...)'`} formátumot kell
            követni.
          </p>
          <p className="text-muted" style={{ textAlign: 'justify' }}>
            <a href="/" onClick={loadDemo}>
              Ide kattintva
            </a>{' '}
            kipróbálhatod az alkalmazást, egy minta táblázat betöltésével.
          </p>
          <Details />
        </div>
      </Container>
    </>
  );
};

export default Homepage;
