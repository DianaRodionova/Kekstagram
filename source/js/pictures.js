import {openBigPicture} from './big-picture.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const newItemTemplate = pictureTemplate.querySelector('.picture');
const errorMessage = document.querySelector('.error-message');

const renderPictures = _.debounce((items) => {
  for (let i = 0; i < items.length; i++) {
    renderPicture(items[i]);
  }
}, 500);

const renderPicture = (item) => {
  const picture = newItemTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  const comments = picture.querySelector('.picture__comments');
  const likes = picture.querySelector('.picture__likes');

  image.src = item.url;
  comments.textContent = item.comments.length;
  likes.textContent = item.likes;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();

    openBigPicture(item);
  });

  pictures.appendChild(picture);
}


const failedRenderPictures = () =>{
  errorMessage.classList.remove('hidden');


  setTimeout(errorMessageHide, 5000);
}

const errorMessageHide = () => {
  errorMessage.classList.add('hidden');
}

export {renderPictures, failedRenderPictures};
