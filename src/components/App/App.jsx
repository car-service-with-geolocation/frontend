// import { Routes, Route } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';

// import Search from '../Search/Search';
// import AboutService from '../AboutService/AboutService';
// import Feedback from '../Feedback/Feedback';
// import HowServiceWorks from '../HowServiceWorks/HowServiceWorks';
// import MainPage from '../MainPage/MainPage';
// import BestService from '../BestService/BestService';
// import Modal from '../Modal/Modal';
// import Footer from '../Footer/Footer';
// import Login from '../Login/Login';
// import Registration from '../Registration/Registration';
// import Profile from '../Profile/Profile';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import '../../index.css';

import Header from '../Header/Header';
import style from './styles/App.module.css';

function App() {
  // const accessToken = getCookie('accessToken').replace('Bearer', '');
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   dispatch(checkUserAuth());
  //   dispatch(getClosestAutoServices())
  // }, []);
  //
  // const { closestAutoServiceRequest } = useSelector((store) => store.closestAutoServiceReducer);
  //
  // if (closestAutoServiceRequest) {
  //   return <p>Загрузка</p>;
  // }

  return (
    <div className={style.app}>
      <Header />
      {/* <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login"
        element={
          <ProtectedRoute onlyUnAuth={true}>
          <Login />
          </ProtectedRoute>
        }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile"
          element={
          <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
        }
        />
      </Routes> */}
    </div>
  );
}

export default App;
