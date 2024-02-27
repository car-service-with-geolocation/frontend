import { baseUrl } from './constants';

const handleRes = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(() => {
    throw new Error(`Ошибка: ${res.status}`);
  });
};

export default async function submitFormData(formData: FormData) {
  const token = localStorage.getItem('JWT');
  const boundary = '-'; // Создание уникальной строки в качестве разделителя

  const headers = new Headers();
  headers.append('Authorization', `Token ${token}`);
  headers.append('Content-Type', `multipart/form-data; boundary=${boundary}`);

  const response = await fetch(`${baseUrl}orders/me/`, {
    method: 'POST',
    body: formData,
    headers,
  });
  return handleRes(response);
}
