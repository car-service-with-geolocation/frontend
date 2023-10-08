/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import './Ymap.css';

import {
  // Circle,
  Clusterer,
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  // SearchControl,
  YMaps,
  ZoomControl,
} from '@pbe/react-yandex-maps';
import { useState } from 'react';

import YmapIcon from '../../images/YmapIcon.svg';
import { YMAP_API_KEY, YMAP_VERSION } from '../../utils/constants';
import { TService } from '../../utils/types';
import { BallonComponent, Portal } from './BallonComponent/BallonComponent';

type TYmapProps = {
  services: TService[];
};

function Ymap({ services }: TYmapProps) {
  const [activePortal, setActivePortal] = useState(false);
  const [point, setPoint] = useState<TService>();

  return (
    <YMaps query={{ apikey: YMAP_API_KEY }} version={YMAP_VERSION}>
      <div className="container">
        <Map
          defaultState={{
            center: [55.831903, 37.411961],
            zoom: 9,
          }}
          width="100%"
          height="100%"
        >
          <FullscreenControl
            options={{
              float: 'right',
              position: { top: 10, right: 10 },
            }}
          />

          <GeolocationControl
            options={{
              float: 'right',
              position: { top: 50, right: 10 },
            }}
          />

          <ZoomControl
            options={{
              position: { top: 110, right: 10 },
            }}
          />
          <Clusterer
            options={{
              preset: 'islands#invertedBrownClusterIcons',
              groupByCoordinates: false,
              gridSize: 100, // Размер ячейки кластеризации в пикселях.
            }}
          >
            {services.map((service) => (
              <Placemark
                modules={['geoObject.addon.balloon']}
                key={service.id}
                geometry={[service.geolocation.latitude, service.geolocation.longitude]}
                properties={{
                  iconCaption: `${service.company.title}`,
                  balloonContent: `<div id=${service.id} class="ballonContainer"></div>`,
                }}
                options={{
                  hideIconOnBalloonOpen: false,
                  iconLayout: 'default#image',
                  iconImageSize: [32, 32],
                  iconImageHref: YmapIcon,
                }}
                onClick={() => {
                  setPoint(service);
                  setActivePortal(false);
                  // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                  setTimeout(() => {
                    setActivePortal(true);
                  }, 0);
                }}
              />
            ))}
          </Clusterer>

          {/* <Placemark
            // modules={["geoObject.addon.balloon"]}
            geometry={[55.851903, 37.511961]}
            options={{
              hasHint: true,
              openEmptyHint: true,
              openHintOnHover: true,
              hideIconOnBalloonOpen: false,
              pointOverlay: 'default#placemark',
              iconColor: '#485FD4',
              preset: 'islands#blueAutoCircleIcon',
              iconImageSize: [32, 32],
              // iconLayout: "default#image",
              // iconImageHref: icon,
            }}
            properties={{
              openEmptyHint: true,
              hintContent: 'address',
              iconCaption: 'Лучший Автосервис ',
              balloonContent:
                '<div id="ballonContainer" class="ballonContainer">++++</div>',
            }}
            onClick={() => {
              setActivePortal(false);
              // ставим в очередь промисов, чтобы сработало после отрисовки балуна
              setTimeout(() => {
                setActivePortal(true);
              }, 0);
            }}
          /> */}
        </Map>
        {activePortal && point && (
          <Portal getHTMLElementId={point.id}>
            {/* ставим свой компонент */}
            <BallonComponent point={point} />
          </Portal>
        )}
      </div>
    </YMaps>
  );
}

export default Ymap;
