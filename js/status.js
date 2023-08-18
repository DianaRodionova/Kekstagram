import {isEscEvent, isEnterEvent} from './util.js';

const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorFragment = document.createDocumentFragment();
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();


const showError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  document.addEventListener('click', (evt) => {
    let element = errorElement.querySelector('.error__inner');

    if (!element.contains(evt.target)) {
      hideAllert('.error')
    }
  });

  errorButton.addEventListener('click', () => {
    hideAllert('.error');
  });

  errorButton.addEventListener('keydown', (evt) => {
    if (isEnterEvent(evt)) {
      hideAllert('.error');
    }
  });

  document.addEventListener('keydown', onAlertEscKeydown);

  errorFragment.appendChild(errorElement);
  main.appendChild(errorFragment);
};


const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const successButton = successElement.querySelector('.success__button');

  document.addEventListener('click', (evt) => {
    let element = successElement.querySelector('.success__inner');

    if (!element.contains(evt.target)) {
      hideAllert('.success')
    }
  });

  successButton.addEventListener('click', () => {
    hideAllert('.success');
  });

  successButton.addEventListener('keydown', (evt) => {
    if (isEnterEvent(evt)) {
      hideAllert('.success');
    }
  });

  document.addEventListener('keydown', onAlertEscKeydown);

  successFragment.appendChild(successElement);
  main.appendChild(successFragment);
}

const hideAllert = (type) => {
  document.querySelector(type).remove();
  document.removeEventListener('keydown', onAlertEscKeydown);
};

const onAlertEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    hideAllert();
  }
};

export { showError, showSuccess };
