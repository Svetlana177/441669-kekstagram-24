/*Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Получение случайного целого числа в заданном интервале, включительно*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return ((min < 0 && max < 0) || max <= min) ? 'Недопустимое значение диапазона' :  Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
getRandomIntInclusive(0.1, 1);

const test = 'Hello, World!';
function getMaxStringLength(str, maxLength = 140) {
  return str.length < maxLength;
}

getMaxStringLength(test);
