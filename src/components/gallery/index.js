import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import imagePath01 from 'src/assets/gallery/pexels-invisiblepower-1076885.jpg';
import imagePath02 from 'src/assets/gallery/pexels-jill-wellington-3776947.jpg';
import imagePath03 from 'src/assets/gallery/pexels-krivec-ales-547115.jpg';
import imagePath04 from 'src/assets/gallery/pexels-pixabay-207518.jpg';
import imagePath05 from 'src/assets/gallery/pexels-pixabay-414102.jpg';
import imagePath06 from 'src/assets/gallery/pexels-william-jesús-casique-toro-2744616.jpg';

const imagePathList = [
  imagePath01,
  imagePath02,
  imagePath03,
  imagePath04,
  imagePath05,
  imagePath06,
];

const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: 'calc(100vw / 16 * 9)',
    maxHeight: 500,
    backgroundImage: `url(${imagePath01})`,
  },
  image: {
    height: 'calc(100vw / 16 * 9)',
    maxHeight: 500,
    width: '100%',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
  },
});

const Gallery = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prev) => ((prev + 1) < imagePathList.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={classes.root}>
      {imagePathList.map((imageUrl, index) => {
        const isActive = imageIndex === index;
        return (
          <Fade
            key={imageUrl}
            in={isActive}
            timeout={1800}
          >
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </Fade>
        );
      })}
    </div>
  );
};

export default Gallery;
