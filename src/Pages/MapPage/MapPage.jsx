import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import style from './MapPage.module.css';

function MapPage() {
  return (
    <>
      <Header />
      <h1 className={style.title}>Поиск автосервисов</h1>
      <Search />
      <div className={style.optionsWrapper}>
        <button />
      </div>
      <Footer />
    </>
  );
}
export default MapPage;
