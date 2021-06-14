import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 900,
    marginTop: 32,
    marginBottom: 12,
  },
  requiredStar: {
    fontWeight: 400,
    color: '#f04',
  },
}));

const FormLabel = ({ label, isRequired = false }) => {
  const classes = useStyles();

  return (
    <div className={classes.label}>
      <span>{label}</span>
      {isRequired && <span className={classes.requiredStar}>*</span>}
      <span>：</span>
    </div>
  );
};

export default FormLabel;
