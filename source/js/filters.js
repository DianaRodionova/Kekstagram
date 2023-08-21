import {photos} from './api.js';
import {renderPictures} from './pictures.js';
import {getRandomIntInclusive} from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filtersForm = filtersElement.querySelector('.img-filters__form');
let filterButtonId = 'filter-default';
let newPhotos = photos;

const activateFilters = () => {
  return filtersElement.classList.remove('img-filters--inactive');
};

filtersForm.addEventListener('click', (evt) => {
  if (evt.target.id === filterButtonId && evt.target.id !== 'filter-random') {
    return;
  }

  let currentFilter = filtersElement.querySelector(`#${filterButtonId}`);

  currentFilter.classList.remove('img-filters__button--active');

  filterButtonId = evt.target.id;

  let newFilter = filtersElement.querySelector(`#${filterButtonId}`);

  newFilter.classList.add('img-filters__button--active');

  switch (filterButtonId) {
    case 'filter-default':
      newPhotos = photos.slice();
      break;
    case 'filter-random':
      randomPhotos();
      break;
    case 'filter-discussed':
      discussedPhotos();
      break;
  }

  removePhotos();
  renderPictures(newPhotos);
});

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');

  if (images) {
    images.forEach(element => {
      element.remove();
    });
  }
};

const randomPhotos = () => {
  newPhotos = [];
  for (let i = 0; i < 10; i++) {
    newPhotos.push(photos[getRandomIntInclusive(0, photos.length - 1)]);
  }
}

const discussedPhotos = () => {
  newPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
}

export {activateFilters};
