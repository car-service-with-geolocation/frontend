import card1 from '../../images/bestService-card1.png';
import card2 from '../../images/bestService-card2.png';
import card3 from '../../images/bestService-card3.png';
import BestServiceCard from '../BestServiceCard/BestServiceCard';
import style from './styles/styles.module.css';

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
];

function BestService() {
  return (
    <section className={style.section} aria-label="Секция лучшие сервисы">
      <h2 className={style.title}>Лучшие сервисы</h2>
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
  );
}

export default BestService;
