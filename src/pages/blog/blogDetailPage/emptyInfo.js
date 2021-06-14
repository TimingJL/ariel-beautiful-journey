import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import EmptyBoxImagePath from 'src/components/icons/box.svg';

const useStyles = makeStyles({
  emptyInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyBoxImage: {
    width: 120,
    height: 120,
  },
  emptyDescription: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const EmptyInfo = () => {
  const classes = useStyles();

  return (
    <div className={classes.emptyInfoWrapper}>
      <img
        src={EmptyBoxImagePath}
        alt=""
        className={classes.emptyBoxImage}
      />
      <div className={classes.emptyDescription}>
        <div>找不到此文章</div>
      </div>
    </div>
  );
};

export default EmptyInfo;
