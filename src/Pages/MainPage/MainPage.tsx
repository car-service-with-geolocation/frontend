import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import AboutUs from '../../components/AboutUs/AboutUs';
import BestService from '../../components/BestService/BestService';
import Feedback from '../../components/Feedback/Feedback';
import HowServiceWorks from '../../components/HowServiceWorks/HowServiceWorks';
import MainScreen from '../../components/MainScreen/MainScreen';
import Preloader from '../../components/Preloader/Preloader';
import Search from '../../components/Search/Search';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServices } from '../../store/autoServicesSlice';
import { fetchCars } from '../../store/carsSlice';

function MainPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAutoServices());
    dispatch(fetchCars());
  }, [dispatch]);

  const { status } = useAppSelector((store) => store.mainAutoServices);

  if (status === 'loading') {
    return <Preloader />;
  }
  if (status === 'rejected') {
    navigate('/404');
  }

  return (
    <>
      <MainScreen />
      <Search />
      <BestService />
      <AboutUs />
      <HowServiceWorks />
      <Feedback />
    </>
  );
}

export default MainPage;
