import React, { useState } from 'react';
import {
  useLocation, useHistory,
} from 'react-router-dom';

import NavigationBar from 'src/components/navigationBar';
import NavigationTabs from 'src/components/navigationTabs';
import {
  TAB_MAKEUP,
  TAB_TRAVEL,
  TAB_AROMATHERAPY,
  TAB_LIFE,
  TAB_TEXT_HOME,
  TAB_TEXT_MAKEUP,
  TAB_TEXT_TRAVEL,
  TAB_TEXT_AROMATHERAPY,
  TAB_TEXT_LIFE,
} from './const';
import Routes from './routes';

const tabOptions = [
  {
    text: TAB_TEXT_HOME,
    path: '/',
  },
  {
    text: TAB_TEXT_MAKEUP,
    path: `/${TAB_MAKEUP}`,
  },
  {
    text: TAB_TEXT_TRAVEL,
    path: `/${TAB_TRAVEL}`,
  },
  {
    text: TAB_TEXT_AROMATHERAPY,
    path: `/${TAB_AROMATHERAPY}`,
  },
  {
    text: TAB_TEXT_LIFE,
    path: `/${TAB_LIFE}`,
  },
];

const Main = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const foundTab = tabOptions.find((option) => option.path.indexOf(pathname) > -1);
  const [activeTab, setActiveTab] = useState(foundTab ? foundTab.text : tabOptions[0].text);

  const handleOnTabChange = (tabIndex) => {
    const selectedTab = tabOptions[tabIndex];
    setActiveTab(selectedTab.text);
    history.push(selectedTab.path);
  };

  return (
    <>
      <NavigationBar />
      <NavigationTabs
        activeTab={activeTab}
        tabOptions={tabOptions.map((option) => option.text)}
        handleOnTabChange={handleOnTabChange}
      />
      <Routes />
    </>
  );
};

export default Main;
