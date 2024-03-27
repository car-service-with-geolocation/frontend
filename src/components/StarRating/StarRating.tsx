import { useState } from 'react';

import styles from './styles/styles.module.css';

type TstarRatingProps = {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

function StarRating({ rating, setRating }: TstarRatingProps) {
  const [hover, setHover] = useState<number>(0);

  return (
    <div className={styles.ratingContainer}>
      {[...Array(5)].map((_star, i) => {
        const ratingValue: number = i + 1;

        return (
          <label key={ratingValue} htmlFor="star" className={styles.label}>
            <input type="radio" name="star" id="star" value={ratingValue} />
            <svg
              className={styles.starSvg}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              onClick={() => setRating(ratingValue)}
            >
              <path
                d="M20.4991 32.3216L12.0162 37.6723C11.6414 37.922 11.2497 38.029 10.8408 37.9933C10.432 37.9576 10.0743 37.815 9.7677 37.5653C9.46109 37.3156 9.22261 37.0031 9.05227 36.6278C8.88193 36.2526 8.84786 35.8338 8.95007 35.3715L11.1986 25.2587L3.68656 18.4634C3.34588 18.1424 3.13329 17.7764 3.0488 17.3654C2.96432 16.9545 2.98953 16.5536 3.12443 16.1626C3.26071 15.7702 3.46512 15.4492 3.73766 15.1995C4.0102 14.9498 4.38495 14.7893 4.8619 14.7179L14.7757 13.8083L18.6084 4.28416C18.7787 3.85611 19.0431 3.53507 19.4015 3.32104C19.7599 3.10701 20.1257 3 20.4991 3C20.8739 3 21.2398 3.10701 21.5968 3.32104C21.9538 3.53507 22.2182 3.85611 22.3899 4.28416L26.2226 13.8083L36.1364 14.7179C36.6133 14.7893 36.9881 14.9498 37.2606 15.1995C37.5331 15.4492 37.7375 15.7702 37.8738 16.1626C38.0101 16.555 38.036 16.9567 37.9515 17.3676C37.867 17.7785 37.6537 18.1438 37.3117 18.4634L29.7997 25.2587L32.0482 35.3715C32.1504 35.8352 32.1163 36.2547 31.946 36.63C31.7756 37.0052 31.5372 37.317 31.2306 37.5653C30.9239 37.815 30.5662 37.9576 30.1574 37.9933C29.7486 38.029 29.3568 37.922 28.9821 37.6723L20.4991 32.3216Z"
                fill={ratingValue <= (hover || rating) ? '#D19C0E' : '#7A7A7A'}
              />
            </svg>
          </label>
        );
      })}
    </div>
  );
}
export default StarRating;
