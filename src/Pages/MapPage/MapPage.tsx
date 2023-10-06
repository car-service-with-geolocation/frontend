/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-bind */
import './immediate.css';

import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';

import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import SearchServiceCard from '../../components/SearchServiceCard/SearchServiceCard';
import Ymap from '../../components/Ymap/Ymap';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServices } from '../../store/autoServicesSlice';
import { immediateOptions, servicesPerPage } from '../../utils/constants';
import { TImidiatevalue } from '../../utils/types';
import style from './MapPage.module.css';

function MapPage() {
  // store
  const servicesByCoord = useAppSelector((store) => store.autoServiceByCoord.data);
  const servicesByAll = useAppSelector((store) => store.mainAutoServices.data);
  // state
  const [servicesOnPage, setServicesOnPage] = useState(servicesByAll);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchType, setCurrentSearchType] = useState(immediateOptions[1].value);
  const [screenWidth, setScreenWidth] = useState('');
  const [content, setContent] = useState('card');

  const lastServiceIndex = currentPage * servicesPerPage;
  const firstServiceIndex = lastServiceIndex - servicesPerPage;
  const currentServices = servicesOnPage.slice(firstServiceIndex, lastServiceIndex);

  const totalServices = servicesOnPage.length;
  const pages = [];
  const dispatch = useAppDispatch();

  for (let i = 1; i <= Math.ceil(totalServices / servicesPerPage); i += 1) {
    pages.push(i);
  }

  function handleChangeContent() {
    content === 'map' ? setContent('card') : setContent('map');
  }

  function getValue() {
    return currentSearchType
      ? immediateOptions.find((SearchType) => SearchType.value === currentSearchType)
      : '';
  }

  function onChangeSelect(newValue: SingleValue<TImidiatevalue | string>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCurrentSearchType(newValue.value);
  }

  useEffect(() => {
    if (currentSearchType === immediateOptions[1].value) {
      setServicesOnPage(servicesByAll);
    } else {
      setServicesOnPage(servicesByCoord);
    }
  }, [currentSearchType, servicesByAll, servicesByCoord]);

  function windowWidth() {
    const width = window.innerWidth;

    if (width >= 1100) {
      setScreenWidth('desktop');
    } else {
      setScreenWidth('mobile');
    }
  }

  window.onresize = () => {
    setTimeout(() => {
      windowWidth();
    }, 1000);
    // проверка ширины экрана с небольшой задержкой
  };

  useEffect(() => {
    servicesByAll.length === 0 ? dispatch(fetchAutoServices()) : '';
  }, [dispatch, servicesByAll]);
  return (
    <>
      <h1 className={style.title}>Поиск автосервисов</h1>
      {screenWidth === 'desktop' && <Search />}
      <div className={style.options_wrapper}>
        <div className={style.eclipses} />
        <Select
          onChange={onChangeSelect}
          placeholder="Сначала ближайшие"
          value={getValue()}
          options={immediateOptions}
          isLoading={false}
          isSearchable
          isDisabled={content === 'card' ? false : true}
          classNamePrefix="immediate-select"
          className="select"
          noOptionsMessage={() => 'Совпадений не найдено'}
          required
        />
        <label className={style.mapping_label} htmlFor="mapping">
          <input
            className={style.mapping_input}
            id="mapping"
            type="checkbox"
            name="mapping"
            onChange={handleChangeContent}
          />
          <span className={style.mapping_span} />
          <span className={style.mapping_span_card_image} />
          <span className={style.mapping_span_map_image} />
        </label>
      </div>
      {content === 'card' ? (
        <>
          <section className={style.section} aria-label="Секция лучшие сервисы">
            <div className={style.cardscontainer}>
              <div className={style.ellipse} />
              {currentServices.map((service) => {
                return (
                  <SearchServiceCard
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
              type="button"
              className={`${style.nextlink} ${style.arrowlink}`}
              onClick={() => {
                setCurrentPage(currentPage === pages.length ? 1 : currentPage + 1);
              }}
            />
          </div>
        </>
      ) : (
        <Ymap services={servicesByAll} />
      )}
      {screenWidth === 'mobile' && <Search />}
    </>
  );
}
export default MapPage;
