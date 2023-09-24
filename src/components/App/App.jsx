// import { Routes, Route } from 'react-router-dom';
import '../../index.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';

import MainPage from '../../Pages/MainPage/MainPage';
// import Ymap from '../Ymap/Ymap';
import { fetchAutoServices } from '../../store/autoServicesSlice';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './styles/App.module.css';
import ServicePage from '../../Pages/ServicePage/ServicePages';
import MapPage from '../../Pages/MapPage/MapPage';
import ApplicationPage from '../../Pages/ApplicationPage/ApplicationPage';

function App() {
  // const accessToken = getCookie('accessToken').replace('Bearer', '');
  const dispatch = useDispatch();
  //
  useEffect(() => {
    dispatch(fetchAutoServices());
  }, [dispatch]);
  //
  // const { closestAutoServiceRequest } = useSelector((store) => store.closestAutoServiceReducer);
  //
  // if (closestAutoServiceRequest) {
  //   return <p>Загрузка</p>;
  // }

  return (
    <div className={style.app}>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/service/:id" element={<ServicePage />} />
        <Route path="/search" element={<MapPage />} />
        <Route path="/service/:id/application" element={<ApplicationPage />} />
      </Routes>
      <Footer />
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
