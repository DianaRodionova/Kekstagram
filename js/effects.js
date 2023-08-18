const EFFECTS = {
  chrome: {step: 0.1, filter: 'grayscale'},
  sepia: {step: 0.1, filter: 'sepia'},
  marvin: {step: 1, filter: 'invert'},
  phobos: {step: 0.1, filter: 'blur'},
  heat: {step: 0.1, filter: 'brightness'},
};

const effectsElements = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');

let effect = 'none';
let stepEffect = 0.1;

window.noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: stepEffect,
  connect: 'lower',
});

effectsElements.addEventListener('change', (evt) => {
  effect = evt.target.value;

  sliderElement.noUiSlider.updateOptions(
    {start: 100},
    true
  );

  imgUploadPreview.className = '';

  if(effect === 'none') {
    imgUploadPreview.style.filter = '';
    effectLevel.classList.add('hidden');

    return;
  } else {
    effectLevel.classList.remove('hidden');
  }

  imgUploadPreview.classList.add(`effects__preview--${effect}`);
  stepEffect = EFFECTS[effect].step;
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  if(effect === 'none') {
    imgUploadPreview.style.filter = '';

    return;
  }

  let filter;
  sliderValue.value = unencoded[handle];

  if (effect === 'marvin') {
    filter = `${EFFECTS[effect].filter}(${unencoded[handle]}%)`;
  } else if (effect === 'phobos') {
    filter = `${EFFECTS[effect].filter}(${unencoded[handle]}px)`;
  } else {
    filter = `${EFFECTS[effect].filter}(${unencoded[handle]})`;
  }

  imgUploadPreview.style.filter = filter;
});
