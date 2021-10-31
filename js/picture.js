import {photoDescription} from './data.js';
import {openBigPicture} from './big-picture.js';

//Контейнер для изображений от других пользователей
const pictureBlock = document.querySelector('.pictures');

const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const arrayCorrectionPoint = 1;

const userPictureItem = photoDescription();

const pictureListFragment = document.createDocumentFragment();

userPictureItem.forEach(({id, url, like, comments}) => {
  const pictureElement = userPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = like.toString();
  pictureElement.querySelector('.picture__comments').textContent = comments.length.toString();
  pictureListFragment.appendChild(pictureElement);
  //нужно ли удалять этот обработчик потом и если да то как
  pictureElement.addEventListener('click', () => {
    openBigPicture(id - arrayCorrectionPoint);
  });
});

pictureBlock.appendChild(pictureListFragment);

export {userPictureItem};
