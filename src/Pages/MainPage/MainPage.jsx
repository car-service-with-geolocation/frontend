import AboutUs from '../../components/AboutUs/AboutUs';
import MainScreen from '../../components/MainScreen/MainScreen';
import Feedback from '../../components/Feedback/Feedback';
import HowServiceWorks from '../../components/HowServiceWorks/HowServiceWorks';
import Search from '../../components/Search/Search';
import BestService from '../../components/BestService/BestService';

function MainPage() {
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
