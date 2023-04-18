export const WONDEROUS_TIMELINE_START_YEAR = -3000;
export const WONDEROUS_TIMELINE_END_YEAR = 2200;
export const WONDEROUS_TIMELINE_STEP = 100;

const getStepsCount = (
  from: number,
  to: number,
  _step: number,
  checkCount: number = 0,
): number => {
  const multiplier = _step * checkCount;
  if (from + multiplier > to) {
    return checkCount;
  }
  return getStepsCount(from, to, _step, checkCount + 1);
};

const yearsCount = getStepsCount(
  WONDEROUS_TIMELINE_START_YEAR,
  WONDEROUS_TIMELINE_END_YEAR,
  WONDEROUS_TIMELINE_STEP,
);

export const WONDEROUS_TIMELINE_YEARS = new Array(yearsCount)
  .fill(true)
  .map(
    (_, index) =>
      WONDEROUS_TIMELINE_START_YEAR + WONDEROUS_TIMELINE_STEP * index,
  );

const randomImageSource = 'https://picsum.photos/300/300';

export const WOUNDEROUS_ITEMS = [
  {
    column: 1,
    startYear: -2630,
    endYear: -2600,
    color: '#fc6c64',
    image: {uri: randomImageSource},
  },
  {
    column: 1,
    startYear: -700,
    endYear: 1650,
    color: '#b7e6e7',
    image: {uri: randomImageSource},
  },
  {
    column: 2,
    startYear: -310,
    endYear: -100,
    color: '#ffeedc',
    image: {uri: randomImageSource},
  },
  {
    column: 3,
    startYear: 550,
    endYear: 1550,
    color: '#cd7672',
    image: {uri: randomImageSource},
  },
  {
    column: 2,
    startYear: 1430,
    endYear: 1440,
    color: '#138086',
    image: {uri: randomImageSource},
  },
  {
    column: 3,
    startYear: 1560,
    endYear: 1570,
    color: '#f5cac3',
    image: {uri: randomImageSource},
  },
  {
    column: 1,
    startYear: 1850,
    endYear: 1900,
    color: '#f28482',
    image: {uri: randomImageSource},
  },
];
