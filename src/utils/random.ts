const getRandomYear = () => {
  const currentYear = new Date().getFullYear();
  const minYear = 1990;
  return Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function splitmix32(seed: number, min: number, max:number) {
  seed |= 0;
  seed = (seed + 0x9e3779b9) | 0;
  var t = seed ^ (seed >>> 16);
  t = Math.imul(t, 0x21f0aaad);
  t = t ^ (t >>> 15);
  t = Math.imul(t, 0x735a2d97);
  var randomNumber = ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  return Math.floor(randomNumber * (max - min + 1)) + min;
}

export { getRandomYear, getRandomNumber, splitmix32 };
