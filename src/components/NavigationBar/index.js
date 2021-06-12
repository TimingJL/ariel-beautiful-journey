import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		height: 52,
		width: '100%',
		borderBottom: '1px solid #eee',
		alignItems: 'center',
  },
	start: {},
	center: {},
	end: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '0px 20px',
	}
});

const NavigationBar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.start}>1</div>
			<div className={classes.center}>2</div>
			<div className={classes.end}>
				<Button href="#text-buttons" color="primary">
					登入
				</Button>
			</div>
		</div>
	);
};

export default NavigationBar;
