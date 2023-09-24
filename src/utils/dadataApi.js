// eslint-disable-next-line import/extensions
import { DADATA_API, DADATA_API_KEY } from './constants.js';

const handleRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Message: ${err.message} Status: ${res.status}`);
  });
};

// eslint-disable-next-line import/prefer-default-export
export const getReverseGeocod = async (query) => {
  const res = await fetch(`${DADATA_API}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${DADATA_API_KEY}`,
    },
    body: JSON.stringify(query),
  });
  return handleRes(res);
};
