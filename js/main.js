// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const test = 'Hello, World!';
const isStringValid = (str, maxLength = 140) => str.length <= maxLength;

isStringValid(test);

const DESCRIPTION = [
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

const MESSAGE = [
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
const numberOfPhotoDescription = 25;

const getRandomLike = () => getRandomPositiveInteger(MIN_LIKE, MAX_LIKE);

function getRandomItem(array, count) {
  for (let i = 0; i < count; i++) {
    let number = getRandomPositiveInteger(0, 500);
    let breakPoint = true;
    while (breakPoint) { breakPoint = array.includes(number) ? number = getRandomPositiveInteger(0, 500) : false; }
    array[i] = number;
  }  return array;
}

const authorId = [];
const uniqueItem = getRandomItem(authorId, 500);

const createPhotoDescription = () => {
  customId += 1;
  const photoUrl = `photos/${customId}.jpg`;
  const randomDescription = getRandomPositiveInteger(0, DESCRIPTION.length - 1);
  const randomLike = getRandomLike();
  const randomMessage = getRandomPositiveInteger(0, MESSAGE.length - 1);
  const randomName = getRandomPositiveInteger(0, NAMES.length - 1);
  const author = {
    id: uniqueItem.splice(0, 1)[0],
    avatar: `img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
    message: MESSAGE[randomMessage],
    name: NAMES[randomName],
  };

  return {
    id: customId,
    url: photoUrl,
    description: DESCRIPTION[randomDescription],
    like: randomLike,
    comments: author,
  };
};

const photoDescription = Array.from({length: numberOfPhotoDescription}, createPhotoDescription);

console.log(photoDescription);
