import { useSelector } from 'react-redux';

import BestServiceCard from '../BestServiceCard/BestServiceCard';
import style from './styles/styles.module.css';

function BestService() {
  const services = useSelector((store) => store.mainAutoServices.data);
  const servicesToRender = services.slice(0, 3);
  console.log(servicesToRender);
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
              title={service.company.title}
              rating={service.rating}
              votes={service.votes}
              address={service.address}
              openfrom={service.openfrom}
              openuntil={service.openuntil}
              id={service.id}
            />
          );
        })}
      </div>
    </section>
  );
}

export default BestService;
