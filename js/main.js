/*Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Получение случайного целого числа в заданном интервале, включительно*/
function getRandomIntInclusive(min, max) {
  if (min < 0 || max < 0 || max <= min) {
    return 'Недопустимое значение диапазона';
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomIntInclusive(-0.1, 1);

const test = 'Hello, World!';
function isStringValid(str, maxLength = 140) {
  return str.length <= maxLength;
}

isStringValid(test);
