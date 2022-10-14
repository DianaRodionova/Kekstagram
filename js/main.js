const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max <= min) {
    [min, max]=[max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomIntInclusive(1, 10);

const getStringCount = (text, maxLength) => {
  return text.length <= maxLength;
};

getStringCount('Проверка', 140);
