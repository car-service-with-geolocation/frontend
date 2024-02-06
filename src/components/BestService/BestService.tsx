import { useAppSelector } from '../../store';
import ServiceCard from '../ServiceCard/ServiceCard';
import style from './styles/styles.module.css';

function BestService() {
  const services = useAppSelector((store) => store.mainAutoServices.data);
  const servicesToRender = services.slice(0, 3);
  return (
    <section className={style.section} aria-label="Секция лучшие сервисы">
      <h2 className={style.title}>Лучшие сервисы</h2>
      <div className={style.cardscontainer}>
        {servicesToRender.map((service) => {
          return (
            <ServiceCard
              key={service.id}
              image={service.company.logo}
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
