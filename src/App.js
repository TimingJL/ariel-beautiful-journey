import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUser } from 'src/store/actions/user';
import Main from 'src/pages/main';
import { auth } from 'src/firebase';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(setUser({ user }));
    });
  }, [dispatch]);

  return (
    <Main />
  );
};

export default App;
