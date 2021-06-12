import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { setUser } from 'src/store/actions/user';
import NavigationBar from 'src/components/navigationBar';
import NavigationTabs from 'src/components/navigationTabs';

import { auth } from 'src/firebase';

const tabOptions = [
  '首頁',
  '彩妝',
  '旅行',
  '生活日誌',
];

const Main = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(tabOptions[0]);

  const handleOnTabChange = (tabIndex) => {
    setActiveTab(tabOptions[tabIndex]);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(setUser({ user }));
    });
  }, [dispatch]);

  return (
    <div>
      <NavigationBar />
      <NavigationTabs
        activeTab={activeTab}
        tabOptions={tabOptions}
        handleOnTabChange={handleOnTabChange}
      />
    </div>
  );
};

export default Main;
