/* eslint-disable react/prop-types */
import './BallonComponent.css';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

// import image from '../../../images/YmapDefoltImage.svg';
import star from '../../../images/YmapStarIcon.svg';

export function BallonComponent({ point }) {
  return (
    <Link className="Ymap_link" to={`/service/${point.id}`}>
      <section className="Ymap">
        <div className="Ymap__wrapper">
          <h3 className="Ymap__title">{point.title}</h3>
          <div className="Ymap__rating_wrapper">
            <img className="Ymap__star_icon" src={star} alt="Исзображение звездочки" />
            <p className="Ymap__rating_subtitle">
              {point.rating} ({point.votes})
            </p>
          </div>
          <address className="Ymap__addres">{point.address}</address>
          <p className="Ymap__timeWork">
            Осткрыто с {point.openfrom} до {point.openuntil}
          </p>
        </div>
        <img className="Ymap__image" src={point.image} alt="Изображение автосервиса" />
      </section>
    </Link>
  );
}

export const Portal = ({ children, getHTMLElementId }) => {
  // находим искомый HTML по id
  const mount = document.getElementById(getHTMLElementId);
  // создаём свой div
  const el = document.createElement('div');

  useEffect(() => {
    // добавляем свой див к искомому элементу
    if (mount) mount.appendChild(el);
    return () => {
      // удаляем элемент от искомого при завершении компоненты
      if (mount) mount.removeChild(el);
    };
  }, [el, mount]);

  // отменяем отрисовку при отсутствии искомого элемента
  if (!mount) return null;
  // собственно, пририсовываем React-элемент в div к искомому HTML
  return createPortal(children, el);
};
