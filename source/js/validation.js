const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

descriptionInput.addEventListener('input', () => {
  const valueLength = descriptionInput.value.length;

  if (valueLength > MAX_DESCRIPTION_LENGTH) {
    descriptionInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
  } else {
    descriptionInput.setCustomValidity('');
  }

  descriptionInput.reportValidity();
});

hashtagsInput.addEventListener('input', () => {
  hashtagsInput.setCustomValidity('');

  let inputText = hashtagsInput.value.toLowerCase().trim();

  if (!inputText) {
    return;
  }

  let inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return;
  }

  const isStartNotHashtag = inputArray.some((item) => {
    return item[0] !== '#';
  });
  if (isStartNotHashtag) {
    hashtagsInput.setCustomValidity('Хэш-тег начинается с символа #');

  }

  const isOnlyLatticeHashtag = inputArray.some((item) => {
    return item === '#';
  });
  if (isOnlyLatticeHashtag) {
    hashtagsInput.setCustomValidity('Хэш-тег не может состоять только из решетки')
  }

  const isSplitSpaceHashtag = inputArray.some((item) => {
    return item.indexOf('#', 1) >= 1;
  });
  if (isSplitSpaceHashtag) {
    hashtagsInput.setCustomValidity('Хэш-теги разделяются пробелами');
  }

  const isRepeatingHashtag = inputArray.some((item, i, arr) => {
    return arr.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatingHashtag) {
    hashtagsInput.setCustomValidity('Хэш-теги не должны повторяться');
  }

  const isLongHashtag = inputArray.some((item) => {
    return item.length > MAX_SYMBOLS;
  });
  if (isLongHashtag) {
    hashtagsInput.setCustomValidity('Максимальная длина хэш-тега 20 символов, включая решетку');
  }

  if (inputArray.length > MAX_HASHTAGS) {
    hashtagsInput.setCustomValidity('Максимум 5 хэш-тегов');
  }
})
