import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    fontSize: 18,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 160,
    flex: '0 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  tags: {
    paddingTop: 8,
  },
}));

const HorizontalCard = ({ title, coverLink, tags }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={coverLink}
        title={title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h5" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.tags}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="primary"
                size="small"
                variant="outlined"
              />
            ))}
          </div>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="edit" size="small">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default HorizontalCard;
