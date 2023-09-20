import { services } from '../../utils/constants';
import BestServiceCard from '../BestServiceCard/BestServiceCard';
import style from './styles/styles.module.css';

const servicesToRender = services.slice(0, 3);

function BestService() {
  return (
    <section className={style.section} aria-label="Секция лучшие сервисы">
      <h2 className={style.title}>Лучшие сервисы</h2>
      <div className={style.cardscontainer}>
        <div className={style.ellipse} />
        {servicesToRender.map((service) => {
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
