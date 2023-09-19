import './immediate.css';

import { useState } from 'react';
import Select from 'react-select';

import BestServiceCard from '../../components/BestServiceCard/BestServiceCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import { immediateOptions, services } from '../../utils/constants';
import style from './MapPage.module.css';

function MapPage() {
  // const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const totalServices = services.length;

  const lastServiceIndex = currentPage * servicesPerPage;
  const firstServiceIndex = lastServiceIndex - servicesPerPage;
  const currentServices = services.slice(firstServiceIndex, lastServiceIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(totalServices / servicesPerPage); i += 1) {
    pages.push(i);
  }

  return (
    <>
      <Header />
      <h1 className={style.title}>Поиск автосервисов</h1>
      <Search />
      <div className={style.optionsWrapper}>
        <div className={style.eclipse} />
        <Select
          // eslint-disable-next-line react/jsx-no-bind
          // onChange={onChangeSelect}
          placeholder="Сначала ближайшие"
          // value={getValue()}
          options={immediateOptions}
          isLoading={false}
          isSearchable
          classNamePrefix="immediate-select"
          noOptionsMessage={() => 'Совпадений не найдено'}
          required
        />
        <label className={style.mapping_label} htmlFor="mapping">
          <input
            className={style.mapping_input}
            id="mapping"
            type="checkbox"
            name="mapping"
          />
          <span className={style.mapping_span} />
          <span className={style.mapping_span_card_image} />
          <span className={style.mapping_span_map_image} />
        </label>
      </div>
      <section className={style.section} aria-label="Секция лучшие сервисы">
        <div className={style.cardscontainer}>
          <div className={style.ellipse} />
          {currentServices.map((service) => {
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
        <button
          className={`${style.prevlink} ${style.arrowlink}`}
          onClick={() => {
            setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
          }}
        />
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={pages}
        />
        <button
          className={`${style.nextlink} ${style.arrowlink}`}
          onClick={() => {
            setCurrentPage(currentPage === pages.length ? 1 : currentPage + 1);
          }}
        />
      </div>
      <Footer />
    </>
  );
}
export default MapPage;
