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
} from './const';
import Routes from './routes';

const tabOptions = [
  {
    text: '首頁',
    path: '/',
  },
  {
    text: '彩妝',
    path: `/${TAB_MAKEUP}`,
  },
  {
    text: '旅行',
    path: `/${TAB_TRAVEL}`,
  },
  {
    text: '芳療',
    path: `/${TAB_AROMATHERAPY}`,
  },
  {
    text: '生活日誌',
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
