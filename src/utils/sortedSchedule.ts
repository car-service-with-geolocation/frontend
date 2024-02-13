/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import { TworkingTimeInner } from './types';

const sortedSchedule = (props: TworkingTimeInner[] | undefined) => {
  if (props === undefined) {
    return;
  }
  const daysOfWeek: string[] = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  const result: {
    id: number;
    day: string;
    time: string;
  }[] = [];

  for (let i = 0; i < daysOfWeek.length; i++) {
    const day = daysOfWeek[i];
    const daySchedule = props?.find((item) => item.day === day);
    if (daySchedule) {
      result.push(daySchedule);
    }
  }
  return result;
};

export default sortedSchedule;
