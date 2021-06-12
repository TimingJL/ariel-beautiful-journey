import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { setUser } from 'src/store/actions/user';
import NavigationBar from 'src/components/navigationBar';

import { auth } from 'src/firebase';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(setUser({ user }));
    });
  }, [dispatch]);

  return (
    <div>
      <NavigationBar />
    </div>
  );
};

export default Main;
