import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';

const DESCRIPTIONS = [
  'Это я с любимой бабушкой',
  'Наконец-то вырвался в отпуск',
  'Утро начинается не с кофе',
  'Питер вдохновляет!',
  'Люблю свою работу',
  'Мотивация и сила воли - наши все!',
  'Люблю Java Script',
  'Провели очередной митинг',
  'Подготовка к корпоративу',
  'Выдали премию)',
];

const MIN_LIKE = 15;
const MAX_LIKE = 200;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Успешный и брутальный',
  'Виктор Business Online',
  'Kate, твой личный дизайнер',
  'Наталья, профессиональный психолог',
  'Анна, лучший таролог',
  'Виктория, парикмахер. Стильно. Ровно. Дорого',
];

let customId = 0;
const DESCRIPTIONSCOUNT = 25;
const IDNUMBER = 100;
const TWOSENTENCESINONECOMMENT = 2;

const likesCount = () => getRandomPositiveInteger(MIN_LIKE, MAX_LIKE);

//Функция проверки на уникальность
const getUniqueElement = (array, elem) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === elem) {
      return false;
    }
  }
  return true;
};

//уникальный ID комментария
const createUniqueId = (arrayId) => {
  for (let i = 0; i < IDNUMBER; i++) {
    let currentId = getRandomPositiveInteger(0, IDNUMBER);
    while (!getUniqueElement(arrayId, currentId)) {
      currentId = getRandomPositiveInteger(0, IDNUMBER);
    }
    arrayId.push(currentId);
  }
  return arrayId;
};

const index = [];
createUniqueId(index);

//// Функция создаёт один объект с комментарием пользователя
const createComment = () => {
  const randomName = getRandomPositiveInteger(0, NAMES.length - 1);

  const phrase = [];
  for (let i = 0; i < MESSAGES.length; i++) {
    for (let j = 0; j < TWOSENTENCESINONECOMMENT; j++) {
      let currentMessage = MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)];
      while (!getUniqueElement(phrase, currentMessage)) {
        currentMessage = MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)];
      }
      phrase[j] = currentMessage;
    }
  }
  return {
    id: Number(index.splice(0, 1)),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: `${phrase[0]} ${phrase[1]}`,
    name: NAMES[randomName],
  };
};

//генерация комментов
const createAllComments = () => {
  const comments = [];
  for (let i = 0; i < getRandomPositiveInteger(1, 6); i++) {
    comments[i] = createComment();
  }
  return comments;
};

const createPhotoDescription = () => {
  customId += 1;
  const photoUrl = `photos/${customId}.jpg`;
  const randomDescription = getRandomPositiveInteger(0, DESCRIPTIONS.length - 1);
  const randomLike = likesCount();

  return {
    id: customId,
    url: photoUrl,
    description: DESCRIPTIONS[randomDescription],
    like: randomLike,
    comments: createAllComments(),
  };
};

const photoDescription = () => Array.from({length: DESCRIPTIONSCOUNT}, createPhotoDescription);

export {photoDescription, createAllComments, createPhotoDescription};
