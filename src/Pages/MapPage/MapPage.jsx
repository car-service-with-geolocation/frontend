import { Link } from 'react-router-dom';

import BestServiceCard from '../../components/BestServiceCard/BestServiceCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import card1 from '../../images/bestService-card1.png';
import card2 from '../../images/bestService-card2.png';
import card3 from '../../images/bestService-card3.png';
import card4 from '../../images/bestService-card4.png';
import card5 from '../../images/bestService-card5.png';
import card6 from '../../images/bestService-card6.png';
import style from './MapPage.module.css';

const services = [
  {
    id: 1,
    image: card1,
    title: 'LR Premium',
    rating: '5.0',
    votes: 156,
    address: 'Пушкина ул. 27А',
    openfrom: '9',
    openuntil: '00',
  },
  {
    id: 2,
    image: card2,
    title: 'Cool service',
    rating: '5.0',
    votes: 99,
    address: 'Киевская ул.14, подъезд 2',
    openfrom: '10',
    openuntil: '20',
  },
  {
    id: 3,
    image: card3,
    title: 'Билпрайм',
    rating: '4.9',
    votes: 65,
    address: 'Садовая кудринская пер. 2',
    openfrom: '10',
    openuntil: '21',
  },
  {
    id: 4,
    image: card4,
    title: 'Win-СТО',
    rating: '4.9',
    votes: 50,
    address: 'Московский проспект, 7А',
    openfrom: '10',
    openuntil: '22',
  },
  {
    id: 5,
    image: card5,
    title: 'Авто ВСВ',
    rating: '5.0',
    votes: 60,
    address: 'Ул. Главная, 99',
    openfrom: '10',
    openuntil: '23',
  },
  {
    id: 6,
    image: card6,
    title: 'Auto car',
    rating: '4.9',
    votes: 105,
    address: 'Ул. Центральная, 23',
    openfrom: '10',
    openuntil: '21',
  },
];

function MapPage() {
  return (
    <>
      <Header />
      <h1 className={style.title}>Поиск автосервисов</h1>
      <Search />
      <div className={style.optionsWrapper}>
        <button />
      </div>
      <section className={style.section} aria-label="Секция лучшие сервисы">
        <div className={style.cardscontainer}>
          <div className={style.ellipse} />
          {services.map((service) => {
            return (
              <BestServiceCard
                key={service.id}
                image={service.image}
                title={service.title}
                rating={service.rating}
                votes={service.votes}
                address={service.address}
                openfrom={service.openfrom}
                openuntil={service.openuntil}
              />
            );
          })}
        </div>
      </section>
      <div className={style.paginationContainer}>
        <ul className={style.paginationList}>
          <li className={style.paginationElement}>
            <Link className={`${style.prevlink} ${style.arrowlink}`} to="/" />
          </li>
          <li className={style.paginationElement}>
            <Link className={`${style.link} ${style.link_activ}`} to="/">
              1
            </Link>
          </li>
          <li className={style.paginationElement}>
            <Link className={style.link} to="/">
              2
            </Link>
          </li>
          <li className={style.paginationElement}>
            <Link className={style.link} to="/">
              3
            </Link>
          </li>
          <li className={style.paginationElement}>
            <Link className={style.link} to="/">
              4
            </Link>
          </li>
          <li className={style.paginationElement}>
            <Link className={`${style.nextlink} ${style.arrowlink}`} to="/" />
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}
export default MapPage;
