import '../../index.css';

import { SyntheticEvent, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import ApplicationPage from '../../Pages/ApplicationPage/ApplicationPage';
import Login from '../../Pages/Login/Login';
import MainPage from '../../Pages/MainPage/MainPage';
import MapPage from '../../Pages/MapPage/MapPage';
import NotFound from '../../Pages/NotFound/NotFound';
import PasswordReset from '../../Pages/PasswordReset/PasswordReset';
import Registration from '../../Pages/Registration/Registration';
import ServicePage from '../../Pages/ServicePage/ServicePages';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import HideRouteComponent from '../HideRouteComponent/HideRouteComponent';
import style from './styles/App.module.css';

function App() {
  const [isApplicationAcceptPopupOpen, setIsApplicationAcceptPopupOpen] = useState(false);
  const [isMainThanksPopupOpen, setIsMainThanksPopupOpen] = useState(false);
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
  const [isServiceThanksPopupOpen, setIsServiceThanksPopupOpen] = useState(false);

  const closeAllPopups = () => {
    setIsApplicationAcceptPopupOpen(false);
    setIsMainThanksPopupOpen(false);
    setIsFeedbackPopupOpen(false);
    setIsServiceThanksPopupOpen(false);
  };
  const handleApplicationAcceptPopupClick = () => {
    setIsApplicationAcceptPopupOpen(true);
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

  const handleFeedbackSubmit = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    setIsFeedbackPopupOpen(false);
    setIsServiceThanksPopupOpen(true);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClick);
    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
    };
  });

  return (
    <div className={style.app}>
      <Header />
      <ScrollToTop />
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
              handleFeedbackSubmit={handleFeedbackSubmit}
              isServiceThanksOpen={isServiceThanksPopupOpen}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <PasswordReset
              isOpen={isApplicationAcceptPopupOpen}
              onClose={closeAllPopups}
              onPopupOpen={handleApplicationAcceptPopupClick}
            />
          }
        />
        <Route path="/search" element={<MapPage />} />
        <Route
          path="/registration"
          element={
            <Registration
              isOpen={isApplicationAcceptPopupOpen}
              onClose={closeAllPopups}
              onPopupOpen={handleApplicationAcceptPopupClick}
            />
          }
        />
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/service/:id/application"
          element={
            <ApplicationPage
              isOpen={isApplicationAcceptPopupOpen}
              onClose={closeAllPopups}
              onClick={handleApplicationAcceptPopupClick}
            />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <HideRouteComponent
        component={Footer}
        hidePaths={['/reset-password', '/registration', '/login']}
      />
      {/* <Routes></Routes>
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
