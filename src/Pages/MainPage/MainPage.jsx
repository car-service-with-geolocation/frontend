import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AboutUs from '../../components/AboutUs/AboutUs';
import BestService from '../../components/BestService/BestService';
import Feedback from '../../components/Feedback/Feedback';
import HowServiceWorks from '../../components/HowServiceWorks/HowServiceWorks';
import MainScreen from '../../components/MainScreen/MainScreen';
import Search from '../../components/Search/Search';
import { fetchAutoServices } from '../../store/autoServicesSlice';

function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAutoServices());
  }, [dispatch]);

  const { status } = useSelector((store) => store.mainAutoServices);
  if (status === 'loading') {
    return <p>Loading...</p>;
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
