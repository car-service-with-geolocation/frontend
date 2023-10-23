// import { Routes, Route } from 'react-router-dom';
import '../../index.css';

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import ApplicationPage from '../../Pages/ApplicationPage/ApplicationPage';
import MainPage from '../../Pages/MainPage/MainPage';
import MapPage from '../../Pages/MapPage/MapPage';
import NotFound from '../../Pages/NotFound/NotFound';
import PasswordReset from '../../Pages/PasswordReset/PasswordReset';
import Registration from '../../Pages/Registration/Registration';
import ServicePage from '../../Pages/ServicePage/ServicePages';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './styles/App.module.css';

function App() {
  const [isApplicationAcceptOpen, setIsApplicationAcceptOpen] = useState(false);
  const [isMainThanksPopupOpen, setIsMainThanksPopupOpen] = useState(false);
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);

  const closeAllPopups = () => {
    setIsApplicationAcceptOpen(false);
    setIsMainThanksPopupOpen(false);
    setIsFeedbackPopupOpen(false);
  };
  const handleApplicationAcceptClick = () => {
    setIsApplicationAcceptOpen(true);
  };
  const handleMainThanksPopupClick = () => {
    setIsMainThanksPopupOpen(true);
  };
  const handleFeedbackPopupClick = () => {
    setIsFeedbackPopupOpen(true);
  };

  function handleEscapeClick(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClick);
    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
    };
  });

  return (
    <div className={style.app}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              isOpen={isMainThanksPopupOpen}
              onClose={closeAllPopups}
              onClick={handleMainThanksPopupClick}
            />
          }
        />
        <Route
          path="/service/:id"
          element={
            <ServicePage
              isOpen={isFeedbackPopupOpen}
              onClose={closeAllPopups}
              onClick={handleFeedbackPopupClick}
            />
          }
        />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/search" element={<MapPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/service/:id/application"
          element={
            <ApplicationPage
              isOpen={isApplicationAcceptOpen}
              onClose={closeAllPopups}
              onClick={handleApplicationAcceptClick}
            />
          }
        />
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
