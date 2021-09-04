import React, { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Time from './components/Time';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';


function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);


  // Set time on
  useEffect(() => {
    const unsubscribe = new Subject();
    const observable$ = interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (timerOn) {
          setTime((el) => el + 1);
        }
      });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [timerOn]);

  
  // Styling buttons (did it just for fun)
  const useStyles = makeStyles({
  root: {
    minWidth: '300px',
    margin: 'auto',
    width: '500px'
  },
  container: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '70px',
    color: '#686b69',
  },
  start: {
    background: 'linear-gradient(45deg, #2BC0E4 30%, #EAECC6 90%)',
    border: 0,
    borderRadius: 20,
    boxShadow: '0px 10px 50px rgba(234, 236, 198)',
    color: 'white',
    height: 48,
    padding: '10px 30px',
    fontWeight: 700,
    fontSize: 22
  },
  stop: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 20,
    boxShadow: '0 10px 50px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '10px 30px',
    fontWeight: 700,
    fontSize: 22,
    marginRight: 15
  },
  reset: {
    background: 'linear-gradient(45deg, #D2D7D3 30%, #BDC3C7 90%)',
    border: 0,
    borderRadius: 20,
    boxShadow: '0 10px 50px rgba(	210, 215, 211)',
    color: 'white',
    height: 48,
    padding: '10px 30px',
    fontWeight: 700,
    fontSize: 22,
    marginLeft: 15
  }
});
const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container 
      className={classes.container}
      maxWidth="sm">
      <div>
        <Time time={time} />
      </div>
      <div className="buttons">
        {!timerOn && time === 0 && (
          <Button
            onClick={() => setTimeOn(true)}
            className={classes.start}
          >
            Start
          </Button>
        )}
        {(time || timerOn) && (
          <Button
            onClick={function () {
              setTimeOn(false);
              setTime(0);
            }}
            className={classes.stop}
          >
            Stop
          </Button>
        )}
        {(time || timerOn) &&  (
            <Button
              onDoubleClick={function doubleClick() {
                setTimeOn(false)
              }}
            onClick={function() {
              if(time > 0) {
                setTimeOn(true)
              }
            }}
            className={classes.start}
            >
              {timerOn ? "Wait" : "Start"}
            </Button>
        )}
        {(time || timerOn)  && (
          <Button onClick={() => setTime(0)} 
          className={classes.reset}>
            Reset
          </Button>
        )}
      </div>
   </ Container>
   </div>
  );
}

export default App;
