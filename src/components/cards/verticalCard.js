import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  title: {
    fontSize: 20,
  },
  tags: {
    paddingTop: 8,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const VerticalCard = ({
  title, coverLink, tags, handleEdit, handleDelete, handleClickCard,
  isEditable = false,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClickCard}>
        <CardMedia
          className={classes.media}
          image={coverLink}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
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
      </CardActionArea>
      {isEditable && (
      <CardActions className={classes.cardActions}>
        <IconButton aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      )}
    </Card>
  );
};

export default VerticalCard;
