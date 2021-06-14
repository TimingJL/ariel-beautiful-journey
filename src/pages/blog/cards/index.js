import React from 'react';
import VerticalCard from 'src/components/cards/verticalCard';
import HorizontalCard from 'src/components/cards/horizontalCard';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px 20px 60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: 20,
    [theme.breakpoints.up('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
}));

const Cards = ({ blogs }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const Card = isSmUp ? VerticalCard : HorizontalCard;

  return (
    <div className={classes.root}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((blog) => {
        const {
          id,
          title,
          coverLink,
          tags,
        } = blogs[0];
        const key = `${blog}_${id}`;
        return (
          <Card
            key={key}
            title={title}
            coverLink={coverLink}
            tags={tags}
          />
        );
      })}
    </div>
  );
  // return (
  //   <div className={classes.root}>
  //     {blogs.map((blog) => {
  //       const {
  //         id,
  //         title,
  //         coverLink,
  //         tags,
  //       } = blog;
  //       return (
  //         <Card
  //           key={id}
  //           title={title}
  //           coverLink={coverLink}
  //           tags={tags}
  //         />
  //       );
  //     })}
  //   </div>
  // );
};

export default Cards;
