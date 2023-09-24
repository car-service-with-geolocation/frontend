// import { Routes, Route } from 'react-router-dom';
import '../../index.css';

import { Route, Routes } from 'react-router';

import MainPage from '../../Pages/MainPage/MainPage';
import MapPage from '../../Pages/MapPage/MapPage';
import ServicePage from '../../Pages/ServicePage/ServicePages';
// import Ymap from '../Ymap/Ymap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './styles/App.module.css';
import ApplicationPage from '../../Pages/ApplicationPage/ApplicationPage';

function App() {
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
