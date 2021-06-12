import React, { useState } from 'react';
import {
  useLocation, useHistory,
} from 'react-router-dom';

// import history from 'src/utils/history';
import NavigationBar from 'src/components/navigationBar';
import NavigationTabs from 'src/components/navigationTabs';
import Routes from './routes';

const tabOptions = [
  {
    text: '首頁',
    path: '/',
  },
  {
    text: '彩妝',
    path: '/makeup',
  },
  {
    text: '旅行',
    path: '/travel',
  },
  {
    text: '生活日誌',
    path: '/life',
  },
];

const Main = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const foundTab = tabOptions.find((option) => option.path === pathname);
  const [activeTab, setActiveTab] = useState(foundTab.text);

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
