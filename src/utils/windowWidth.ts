import { useEffect, useState } from 'react';

function getWindowWidth() {
  const { innerWidth: width } = window;
  return { width };
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleWindowWidth() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleWindowWidth);
  }, []);

  return windowWidth;
}
