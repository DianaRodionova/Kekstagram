const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
  ENTER: 'Enter',
};

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

const getStringCount = (text, maxLength) => {
  return text.length <= maxLength;
};

const isEscEvent = (evt) => {
  return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
};

const isEnterEvent = (evt) => {
  return evt.key === Keys.ENTER;
};

export {getRandomIntInclusive, getStringCount, isEscEvent, isEnterEvent};
