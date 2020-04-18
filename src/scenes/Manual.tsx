import React from 'react';

import Typography from '@material-ui/core/Typography/Typography';
import Container from '@material-ui/core/Container/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { HeaderBorder } from '../components/Border/Border';
import { Paragraph } from '../components/common/Paragraph';

const useStyles = makeStyles(theme => ({
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
  },
}));

const Manual: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).sendPageView('Útmutató');
  }, []);
  const classes = useStyles();

  const themeColor = '#fab855';

  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.heroContent}>
          <Typography
            // style={{ marginBottom: '40px' }}
            // component="h1"
            variant="h3"
            // color="textPrimary"
            gutterBottom
          >
            <HeaderBorder align="center" backgroundColor="#f39200" text={`Használati útmutató`} fontSize={30} />
          </Typography>
        </div>
        <Paragraph backgroundColor={themeColor} title="Mi ez?">
          Ennek a weboldalnak a célja, hogy segítséget nyújtson a cserkészcsapatok számára táboraik étkeztetésének
          megtervezésében. A használatához szükség van egy nagyon kötött formátumú Google Táblázatra. Ebből a
          táblázatból tölti be az alkalmazás az összes szükséges adatot, úgymint a tábori étlapot vagy a csapat
          receptjeit.
        </Paragraph>
        <Paragraph backgroundColor={themeColor} title="Ha szeretnéd kipróbálni">
          [TODO]
          <br />
          <a href="https://drive.google.com/open?id=1iwHjxxVkPz7LViZWLzPFzOiSEgxsM_1D">
            A minta táblázat itt érhető el.
          </a>{' '}
          Fontos, hogy a működéshez erről a táblázatról kell másolatot készíteni, a különböző, más táblázatokban fel nem
          lelhető függvények miatt.
        </Paragraph>
        <Paragraph backgroundColor={themeColor} title="Táblázat használata">
          [TODO]
        </Paragraph>
      </Container>
    </>
  );
};

export default Manual;
