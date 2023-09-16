import AboutUs from '../AboutUs/AboutUs';
import MainScreen from '../MainScreen/MainScreen';
import Feedback from '../Feedback/Feedback';
import HowServiceWorks from '../HowServiceWorks/HowServiceWorks';
import Search from '../Search/Search';
import BestService from '../BestService/BestService';

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
