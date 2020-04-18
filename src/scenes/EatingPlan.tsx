import React from 'react';

import Typography from '@material-ui/core/Typography/Typography';
import Container from '@material-ui/core/Container/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { HeaderBorder } from '../components/Border/Border';
import { AppContext } from 'services/AppContext';
import { Paragraph } from 'components/common/Paragraph';
import { EatingPlan as EatingPlanInterface } from 'services/getEatingPlan';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';

const useStyles = makeStyles(theme => ({
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
  },
  media: {
    // height: 0,
    // paddingTop: '100%',
    width: '100px',
    height: '100px',
  },
  gridItem: {
    // backgroundColor: theme.palette.background.paper,
  },
}));

const EatingPlan: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).sendPageView('Élelmezési terv');
  });
  const appContext = React.useContext(AppContext);
  const [eatingPlan, setEatingPlan] = React.useState<EatingPlanInterface | null>(null);

  React.useEffect(() => {
    let mounted = true;

    (async function(): Promise<void> {
      if (!appContext || !appContext.getEatingPlan) return;
      const eatingPlan = await appContext.getEatingPlan();
      if (mounted) {
        console.log(eatingPlan);
        setEatingPlan(eatingPlan);
      }
    })();

    return (): void => {
      mounted = false;
    };
  }, [appContext]);

  const classes = useStyles();
  const themeColor = '#0075bf';
  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h3" align="left" color="textPrimary" gutterBottom>
            <HeaderBorder
              align="center"
              backgroundColor={themeColor}
              text={appContext?.appConstants?.title || ''}
              fontSize={30}
            />
          </Typography>
        </div>
        <br />
        <b>[TODO]:</b> Ezzel kezdeni valamit.
        <br />
        <br />
        {/* <CardMedia
          className={classes.media}
          image="https://kep.cdn.indexvas.hu/1/0/2910/29100/291001/29100123_f5767c5542f27029b9b85cf86c964fa6_wm.jpg"
          title="Paella dish"
          // raised={true}
        /> */}
        {eatingPlan ? (
          <Grid container spacing={2}>
            {Object.keys(eatingPlan.plan).map(day => {
              return (
                <Grid item key={day} xs={12} sm={4} md={3} lg={2} className={classes.gridItem}>
                  {/*<React.Fragment key={day}>*/}
                  <Paragraph backgroundColor={themeColor} title={day}>
                    {Object.keys(eatingPlan.plan[day].meals).map(menu => {
                      return (
                        <React.Fragment key={menu}>
                          {menu}:{' '}
                          {eatingPlan.plan[day].meals[menu].isExist ? (
                            <Link to={`/recept/${eatingPlan.plan[day].meals[menu].name}`}>
                              {eatingPlan.plan[day].meals[menu].name}
                            </Link>
                          ) : (
                            eatingPlan.plan[day].meals[menu].name
                          )}
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </Paragraph>
                  {/*</React.Fragment>*/}
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <>
            <LinearProgress />
          </>
        )}
      </Container>
    </>
  );
};

export default EatingPlan;
