import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 900,
    marginTop: 32,
    marginBottom: 12,
  },
}));

const FormLabel = ({ label }) => {
  const classes = useStyles();

  return (
    <div className={classes.label}>{`${label}：`}</div>
  );
};

export default FormLabel;
