const getRandomYear = () => {
  const currentYear = new Date().getFullYear();
  const minYear = 1980;
  return Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getRandomYear, getRandomNumber };
