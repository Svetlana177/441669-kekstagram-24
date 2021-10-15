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

const likesCount = () => getRandomPositiveInteger(MIN_LIKE, MAX_LIKE);

const getRandomItem = (array, count) => {
  for (let i = 0; i < count; i++) {
    let number = getRandomPositiveInteger(0, 500);
    let breakPoint = true;
    while (breakPoint) {
      breakPoint = array.includes(number) ? number = getRandomPositiveInteger(0, 500) : false;
    }
    array[i] = number;
  }
  return array;
};

const authorId = [];
const uniqueItem = getRandomItem(authorId, 500);

//// Функция создаёт один объект с комментарием пользователя
const createComment = () => {
  const randomMessage = getRandomPositiveInteger(0, MESSAGES.length - 1);
  const randomName = getRandomPositiveInteger(0, NAMES.length - 1);

  return {
    id: uniqueItem.splice(0, 1)[0],
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: MESSAGES[randomMessage],
    name: NAMES[randomName],
  };
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
    comments: Array.from({length: getRandomPositiveInteger(1, 6)}, createComment),
  };
};

const photoDescription = () => Array.from({length: DESCRIPTIONSCOUNT}, createPhotoDescription);

export {photoDescription};
