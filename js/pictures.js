import {addPhotos} from './data.js';
import {openBigPicture} from './big-picture.js';

let pictures = document.querySelector('.pictures');
let pictureTemplate = document.querySelector('#picture').content;
let newItemTemplate = pictureTemplate.querySelector('.picture');

function renderPictures(items) {
  for (let i = 0; i < items.length; i++) {
    renderPicture(items[i]);
  }
}

function renderPicture(item) {
  let picture = newItemTemplate.cloneNode(true);
  let image = picture.querySelector('.picture__img');
  let comments = picture.querySelector('.picture__comments');
  let likes = picture.querySelector('.picture__likes');

  image.src = item.url;
  comments.textContent = item.comments.length;
  likes.textContent = item.likes;

  picture.addEventListener('click', function (evt) {
    evt.preventDefault();

    openBigPicture(item);
  });

  pictures.appendChild(picture);
}

renderPictures(addPhotos());

export {renderPictures};
