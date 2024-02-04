/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-bind */
import './immediate.css';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';
import Select, { SingleValue } from 'react-select';

import Search from '../../components/Search/Search';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import Ymap from '../../components/Ymap/Ymap';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServices } from '../../store/autoServicesSlice';
import { immediateOptions, servicesPerPage } from '../../utils/constants';
import { TImidiatevalue, TService } from '../../utils/types';
import style from './MapPage.module.css';

function MapPage() {
  // store
  const servicesByCoord = useAppSelector((store) => store.autoServiceByCoord.data);
  const servicesByAll = useAppSelector((store) => store.mainAutoServices.data);
  // state
  const [currentSearchType, setCurrentSearchType] = useState(immediateOptions[1].value);
  const [screenWidth, setScreenWidth] = useState('');
  const [content, setContent] = useState('card');
  // pagination state
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<TService[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const dispatch = useAppDispatch();

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
    windowWidth();
  }, [dispatch, servicesByAll]);

  // pagination
  const handlePageClick = (evt: { selected: number }) => {
    const newOffset = (evt.selected * servicesPerPage) % servicesByAll.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    const endOffset = itemOffset + servicesPerPage;
    if (currentSearchType === immediateOptions[1].value) {
      setCurrentItems(servicesByAll.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(servicesByAll.length / servicesPerPage));
    } else {
      setCurrentItems(servicesByCoord.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(servicesByCoord.length / servicesPerPage));
    }
  }, [currentSearchType, servicesByAll, servicesByCoord, itemOffset]);

  return (
    <>
      <Helmet>
        <title>Поиск автосервисов</title>
        <meta property="og:title" content="Поиск автосервисов" />
      </Helmet>
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
          isSearchable={false}
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
        <section className={style.section} aria-label="Секция лучшие сервисы">
          <div className={style.cardscontainer}>
            {currentItems.map((service) => {
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
          <ReactPaginate
            breakLabel="..."
            nextLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel=""
            renderOnZeroPageCount={null}
            containerClassName={style.pagination}
            pageLinkClassName={style.link}
            previousLinkClassName={`${style.prevlink} ${style.arrowlink}`}
            nextLinkClassName={`${style.nextlink} ${style.arrowlink}`}
            activeLinkClassName={style.link_active}
            breakClassName={`${style.link} ${style.break}`}
          />
        </section>
      ) : (
        <div className={style.mapWrapper}>
          <Ymap services={servicesByAll} />
        </div>
      )}
      {screenWidth === 'mobile' && <Search />}
    </>
  );
}
export default MapPage;
