import {getRandomIntInclusive} from './util.js';


const DESCRIPTION = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const Comments = {
  min: 1,
  max: 15,
};

const Avatars = {
  min: 1,
  max: 6,
};

const Messages = {
  min: 0,
  max: 5,
};

const Names = {
  min: 0,
  max: 7,
};

const Descriptions = {
  min: 0,
  max: 6,
};

const Likes = {
  min: 15,
  max: 200,
};

const addPhotos = () => {
  let photos = [];
  for (let i = 1; i <= 25; i++) {
    let comments = [];
    for (let i = 1; i <= getRandomIntInclusive(Comments.min, Comments.max); i++) {
      comments.push({id: i,
        avatar: 'img/avatar-'+getRandomIntInclusive(Avatars.min, Avatars.max)+'.svg',
        message: MESSAGES[getRandomIntInclusive(Messages.min, Messages.max)],
        name: NAMES[getRandomIntInclusive(Names.min, Names.max)],
      })
    }

    photos.push({id: i,
      url: 'photos/'+ i + '.jpg',
      description: DESCRIPTION[getRandomIntInclusive(Descriptions.min, Descriptions.max)],
      likes: getRandomIntInclusive(Likes.min, Likes.max),
      comments: comments,
    })
  }

  return photos;
};

export {addPhotos};
