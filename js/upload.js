import {sendData} from './api.js';
import {isEscEvent, isEnterEvent} from './util.js';
import {showError, showSuccess} from './status.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const scaleValue = document.querySelector('.scale__control--value');
const effectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
const uploadForm = document.querySelector('.img-upload__form');
const effectsPreviews = document.querySelectorAll('.effects__preview');

uploadFile.addEventListener('input', () => {
  const valueLength = uploadFile.value.length;

  if (valueLength > 0) {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  }

  document.addEventListener('keydown', onPopupEscKeydown);
});

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgUploadPreview.src = reader.result;

      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
});

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  resetSettings();

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.remove('modal-open');
};

const resetSettings = () => {
  imgUploadPreview.style.transform = 'scale(1)';
  imgUploadPreview.style.filter = '';
  imgUploadPreview.className = '';
  scaleValue.value = '100%';
  effectLevel.classList.add('hidden');
};

const setUploadFormSubmit = () => {
  uploadForm.addEventListener('submit',  (evt) => {
    evt.preventDefault();

    sendData(
      () => successSend(),
      () => errorSend(),
      new FormData(evt.target),
    );
  })
};

const successSend = () => {
  closeModal();
  showSuccess();
};

const errorSend = () => {
  closeModal();
  showError();
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt) &&  hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement) {
    evt.preventDefault();

    closeModal();
  }
};

uploadCancel.addEventListener('click', () => {
  closeModal();
});

uploadCancel.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeModal();
  }
});

export {setUploadFormSubmit};

