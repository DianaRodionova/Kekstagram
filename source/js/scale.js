const CONTROL_VALUES = {
  min: '25%',
  max: '100%',
};

const smallerElement = document.querySelector('.scale__control--smaller');
const biggerElement = document.querySelector('.scale__control--bigger');
const valueElement = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');

smallerElement.addEventListener('click', () => {
  const valueInput = valueElement.value;
  let newValue;
  let scaleStyle;

  if (valueInput === CONTROL_VALUES.min) {
    return;
  }

  switch (valueInput) {
    case '100%':
      newValue = '75%';
      scaleStyle = 'scale(0.75)';
      break;
    case '75%':
      newValue = '50%';
      scaleStyle = 'scale(0.5)';
      break;
    case '50%':
      newValue = '25%';
      scaleStyle = 'scale(0.25)';
      break;
  }

  valueElement.value = newValue;
  imgUploadPreview.style.transform = scaleStyle;
});

biggerElement.addEventListener('click', () => {
  const valueInput = valueElement.value;
  let newValue;
  let scaleStyle;

  if (valueInput === CONTROL_VALUES.max) {
    return;
  }

  switch (valueInput) {
    case '25%':
      newValue = '50%';
      scaleStyle = 'scale(0.5)';
      break;
    case '50%':
      newValue = '75%';
      scaleStyle = 'scale(0.75)';
      break;
    case '75%':
      newValue = '100%';
      scaleStyle = 'scale(1)';
      break;
  }

  valueElement.value = newValue;
  imgUploadPreview.style.transform = scaleStyle;
});
