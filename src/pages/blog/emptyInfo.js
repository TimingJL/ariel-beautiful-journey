import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import EmptyBoxImagePath from 'src/components/icons/box.svg';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  emptyInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  comingTextWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  favoriteIcon: {
    color: '#F96599',
  },
});

const EmptyInfo = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.emptyInfoWrapper}>
      <img
        src={EmptyBoxImagePath}
        alt=""
        className={classes.emptyBoxImage}
      />
      <div className={classes.emptyDescription}>
        <div>{`${title}內容正在準備中`}</div>
        <div className={classes.comingTextWrapper}>
          ~ 敬請期待
          <FavoriteIcon className={classes.favoriteIcon} />
          ~
        </div>
      </div>
    </div>
  );
};

export default EmptyInfo;
