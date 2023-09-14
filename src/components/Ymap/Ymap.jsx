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
import { clusterPoints, YMAP_VERSION } from '../../utils/constants';
import { BallonComponent, Portal } from './BallonComponent/BallonComponent';

function Ymap() {
  const [activePortal, setActivePortal] = useState(false);
  const [point, setPoint] = useState({});
  // query={{ apikey: YMAP_API_KEY }} //Пока в разработке - использовать не будем (Запросы ограничены - 1000)
  return (
    <YMaps version={YMAP_VERSION}>
      <div className="container">
        <Map
          defaultState={{
            center: [55.831903, 37.411961],
            zoom: 9,
          }}
          width="1120px"
          height="800px"
          // modules={["templateLayoutFactory", "layout.ImageWithContent"]}
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
              maxWidth: 50,
              float: 'right',
              position: { top: 110, right: 10 },
            }}
          />
          {/* <SearchControl options={{ float: "right" }} /> */}

          {/* <Circle
            geometry={[[55.76, 37.6], 19800]}
            options={{
              draggable: false,
              fillColor: "#4149B9",
              strokeColor: "#0D158A",
              strokeOpacity: 0.3,
              fillOpacity: 0.2,
              strokeWidth: 2,
            }}
          /> */}
          <Clusterer
            options={{
              preset: 'islands#invertedRedClusterIcons', // "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
              gridSize: 100, // Размер ячейки кластеризации в пикселях.
            }}
          >
            {clusterPoints.map((coords) => (
              <Placemark
                modules={['geoObject.addon.balloon']}
                key={coords.id}
                geometry={coords.coords}
                properties={{
                  iconCaption: `${coords.title.toString()}`,
                  balloonContent: `<div id=${coords.id.toString()} class="ballonContainer"></div>`,
                }}
                options={{
                  // pointOverlay: "default#placemark",
                  // iconColor: "black",
                  // preset: "islands#blueAutoIcon",
                  hideIconOnBalloonOpen: false,
                  iconLayout: 'default#image',
                  iconImageSize: [32, 32],
                  iconImageHref: YmapIcon,
                }}
                onClick={() => {
                  setPoint(coords);
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
        {activePortal && (
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
