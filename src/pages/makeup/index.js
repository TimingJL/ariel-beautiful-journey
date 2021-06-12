import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  container: {
    padding: '20px 0px',
  },
});

const Makeup = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      Makeup
    </Container>
  );
};

export default Makeup;
