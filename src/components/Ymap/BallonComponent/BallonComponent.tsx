/* eslint-disable react/prop-types */
import './BallonComponent.css';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import star from '../../../images/YmapStarIcon.svg';
import { TService } from '../../../utils/types';

type TBallonComponentProps = {
  point: TService;
};

export function BallonComponent({ point }: TBallonComponentProps) {
  return (
    <Link className="Ymap_link" to={`/service/${point.id}`}>
      <section className="Ymap">
        <img
          className="Ymap__image"
          src={point.company.logo}
          alt="Изображение автосервиса"
        />
        <div className="Ymap__wrapper">
          <h3 className="Ymap__title">{point.company.title}</h3>
          <div className="Ymap__rating_wrapper">
            <img className="Ymap__star_icon" src={star} alt="Исзображение звездочки" />
            <p className="Ymap__rating_subtitle">
              {point.rating} ({point.votes})
            </p>
          </div>
          <p className="Ymap__timeWork">{point.working_time_today}</p>
          <address className="Ymap__addres">{point.address}</address>
        </div>
      </section>
    </Link>
  );
}

type TPortalProps = {
  children: React.ReactNode;
  getHTMLElementId: number;
};

export const Portal = ({ children, getHTMLElementId }: TPortalProps) => {
  // находим искомый HTML по id
  const mount = document.getElementById(getHTMLElementId.toString());
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
