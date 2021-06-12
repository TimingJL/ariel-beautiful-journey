import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    borderBottom: '1px solid #eee',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});

const NavigationTabs = ({
  activeTab, tabOptions, handleOnTabChange,
}) => {
  const classes = useStyles();
  const activeTabIndex = tabOptions.indexOf(activeTab);

  const handleChange = (_, tabIndex) => {
    handleOnTabChange(tabIndex);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Tabs
          value={activeTabIndex}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              background: '#8b8bff',
            },
          }}
        >
          {tabOptions.map((option, index) => {
            const isSelected = index === activeTabIndex;
            return (
              <Tab
                key={option}
                label={option}
                style={{
                  color: isSelected ? '#8b8bff' : '#101010',
                  fontWeight: isSelected ? 900 : 400,
                }}
              />
            );
          })}
        </Tabs>
      </Container>
    </div>
  );
};

export default NavigationTabs;
