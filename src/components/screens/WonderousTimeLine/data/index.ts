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
