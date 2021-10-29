import {photoDescription} from './data.js';
import {openBigPicture} from './big-picture.js';

//Контейнер для изображений от других пользователей
const pictureBlock = document.querySelector('.pictures');

const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPictureItem = photoDescription();

const pictureListFragment = document.createDocumentFragment();

userPictureItem.forEach(({id,url, like, comments}) => {
  const pictureElement = userPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = like.toString();
  pictureElement.querySelector('.picture__comments').textContent = comments.length.toString();
  pictureListFragment.appendChild(pictureElement);

  pictureElement.addEventListener('click', () => {
    //Магическое число? foeEach считает с 1го элемента, а массив с нулевого, приходится вычитать 1.
    openBigPicture(id - 1);
    //Удаление обработчика верное?
    pictureElement.removeEventListener('click', openBigPicture );
  });
});

pictureBlock.appendChild(pictureListFragment);

export { userPictureItem };
