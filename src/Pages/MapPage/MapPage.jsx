import './immediate.css';

import Select from 'react-select';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import { immediateOptions } from '../../utils/constants';
import style from './MapPage.module.css';

function MapPage() {
  return (
    <>
      <Header />
      <h1 className={style.title}>Поиск автосервисов</h1>
      <Search />
      <div className={style.options_wrapper}>
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
      <Footer />
    </>
  );
}
export default MapPage;
