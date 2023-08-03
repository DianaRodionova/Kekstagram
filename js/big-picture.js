import {isEscEvent, isEnterEvent} from './util.js';

let bigPicture = document.querySelector('.big-picture');
let comments = bigPicture.querySelector('.social__comments');
let modalClose = bigPicture.querySelector('.big-picture__cancel');

let openBigPicture = function (picture) {
  let image = bigPicture.querySelector('.big-picture__img').querySelector('img');
  let likes = bigPicture.querySelector('.likes-count');
  let comments = bigPicture.querySelector('.comments-count');
  let description = bigPicture.querySelector('.social__caption');

  image.src = picture.url;
  likes.textContent = picture.likes;
  comments.textContent = picture.comments.length;
  description.textContent = picture.description;

  addComments(picture.comments);

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

function addComments(comments) {
  for (let i = 0; i < comments.length; i++) {
    addComment(comments[i]);
  }
}

let addComment = function (comment) {
  let commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  let newComment = commentTemplate.cloneNode(true);

  let image = newComment.querySelector('.social__picture');
  let textComment = newComment.querySelector('.social__text');

  image.src = comment.avatar;
  image.alt = comment.name;
  textComment.textContent = comment.message;

  comments.appendChild(newComment);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.remove('modal-open');
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

modalClose.addEventListener('click', () => {
  closeModal();
});

modalClose.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeModal();
  }
});

export {openBigPicture};
