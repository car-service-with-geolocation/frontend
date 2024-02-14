/* eslint-disable import/prefer-default-export */
export function dataConversion(d: string | null): string {
  return d
    ? new Date(d).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : 'Дата отсутствует';
}

export function setStatus(status: 'OPENED' | 'COMPLETED' | 'CANCELED'): string {
  let text: string;

  switch (status) {
    case 'OPENED':
      text = 'В работе';
      break;
    case 'COMPLETED':
      text = 'Выполнена';
      break;
    case 'CANCELED':
      text = 'Отменена';
      break;
    default:
      text = 'Статус отсутствует';
  }
  return text;
}
