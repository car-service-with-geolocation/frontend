// import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import Feedback from '../Feedback/Feedback';
// import HowServiceWorks from '../HowServiceWorks/HowServiceWorks';
// import AboutService from '../AboutService/AboutService';
// import BestService from '../BestService/BestService';
// import Modal from '../Modal/Modal';
import Footer from '../Footer/Footer';
import MapPage from '../../Pages/MapPage/MapPage';
// import Login from '../Login/Login';
// import Registration from '../Registration/Registration';
// import Profile from '../Profile/Profile';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import '../../index.css';

import AboutUs from '../AboutUs/AboutUs';
import BestService from '../BestService/BestService';
import Feedback from '../Feedback/Feedback';
import Header from '../Header/Header';
import HowServiceWorks from '../HowServiceWorks/HowServiceWorks';
import MainScreen from '../MainScreen/MainScreen';
import { fetchAutoServices } from '../../store/autoServicesSlice';
import Search from '../Search/Search';
// import Ymap from '../Ymap/Ymap';
import style from './styles/App.module.css';

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
      <MapPage />
      <Header />
      <MainScreen />
      <Search />
      <BestService />
      <AboutUs />
      <HowServiceWorks />
      <Feedback />
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
