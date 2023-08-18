import './pictures.js';
import './upload.js';
import './scale.js';
import './effects.js';
import './validation.js';
import {renderPictures, failedRenderPictures} from './pictures.js';
import {getData} from './api.js';
import {setUploadFormSubmit} from './upload.js';
import {activateFilters} from './filters.js';

const load = async () => {
  try {
    await getData(
      (photos) => {
        renderPictures(photos);
      },
      (error) => {
        failedRenderPictures(error);
      }
    );

    activateFilters();
  } catch (error) {
    failedRenderPictures(error);
  }
};

load();

setUploadFormSubmit();
