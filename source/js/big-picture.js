import {isEscEvent, isEnterEvent} from './util.js';

const COMMENTS_LOAD_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const comments = bigPicture.querySelector('.social__comments');
const modalClose = bigPicture.querySelector('.big-picture__cancel');
const buttonComments = bigPicture.querySelector('.comments-loader');
const countComments = bigPicture.querySelector('.comments-count');
let countVisibleComments = COMMENTS_LOAD_STEP;
let currentPicture;

const openBigPicture = (picture) => {
  const image = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const likes = bigPicture.querySelector('.likes-count');
  const maxCountComments = bigPicture.querySelector('.comments-count-max');
  const description = bigPicture.querySelector('.social__caption');

  currentPicture = picture;
  image.src = picture.url;
  likes.textContent = picture.likes;
  description.textContent = picture.description;

  if (picture.comments.length <= COMMENTS_LOAD_STEP) {
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    countVisibleComments = picture.comments.length;
  }

  addComments(picture.comments, 0, countVisibleComments);


  countComments.textContent = countVisibleComments;
  maxCountComments.textContent = picture.comments.length;

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

buttonComments.addEventListener('click', () => {onClick(currentPicture);});

const onClick = (picture) => {
  if (countVisibleComments + COMMENTS_LOAD_STEP < picture.comments.length) {
    addComments(picture.comments, countVisibleComments, countVisibleComments + COMMENTS_LOAD_STEP);
    countVisibleComments += COMMENTS_LOAD_STEP;
    countComments.textContent = countVisibleComments;

    return;
  }

  addComments(picture.comments, countVisibleComments, countVisibleComments + (picture.comments.length - countVisibleComments));
  countVisibleComments = countVisibleComments + (picture.comments.length - countVisibleComments);
  countComments.textContent = countVisibleComments;
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
}

const addComments = (comments, start, count) => {
  for (let i = start; i < count; i++) {
    addComment(comments[i]);
  }
}

const addComment = (comment) => {
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const newComment = commentTemplate.cloneNode(true);

  const image = newComment.querySelector('.social__picture');
  const textComment = newComment.querySelector('.social__text');

  image.src = comment.avatar;
  image.alt = comment.name;
  textComment.textContent = comment.message;

  comments.appendChild(newComment);
};

const removeComments = () => {
  const comments = document.querySelectorAll('.social__comment');

  if (comments) {
    comments.forEach(element => {
      element.remove();
    });
  }
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  removeComments();
  buttonComments.removeEventListener('click', () => {onClick(currentPicture);});
  countVisibleComments = COMMENTS_LOAD_STEP;

  if (bigPicture.querySelector('.comments-loader').classList.contains('hidden')) {
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  }

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.remove('modal-open');
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

modalClose.addEventListener('click', closeModal);

modalClose.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeModal();
  }
});

export {openBigPicture};
