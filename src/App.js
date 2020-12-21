import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import Reports from './components/AdminUI/Reports/Reports';
import EditVacation from './components/AdminUI/EditVacation/EditVacation';
import RemoveVacation from './components/AdminUI/RemoveVacation/RemoveVacation';
import Vacations from './components/Vacations/Vacations';
import jwt_decode from 'jwt-decode';
import AddVacation from './components/AdminUI/AddVacation/AddVacation';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!localStorage.token)
          return;
        const decoded = await jwt_decode(localStorage.token);
        dispatch({
          type: 'SIGNIN',
          payload: decoded
        });
      } catch (err) {
        console.log(err);
      }
    }
    verifyToken();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Route exact path='/' component={Vacations} />
      <Route path='/signup' component={SignUp} />
      <Route path='/add' component={AddVacation} />
      <Route path='/signin' component={SignIn} />
      <Route path='/reports' component={Reports} />
      <Route path='/vacations' component={Vacations} />
      <Route path='/remove' component={RemoveVacation} />
      <Route path='/edit' component={EditVacation} />
    </Router>
  );
};

export default App;
