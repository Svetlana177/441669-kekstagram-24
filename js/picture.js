import {fillBigPicture} from './big-picture.js';
import {isEnterKey} from './utils/is-key-values.js';

//Контейнер для изображений от других пользователей
const pictureBlock = document.querySelector('.pictures');

const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderSimilarPicture = (similarPictures) => {

  const pictureListFragment = document.createDocumentFragment();

  similarPictures.forEach(({id, url, likes, comments}) => {
    const pictureElement = userPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length.toString();
    pictureListFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => {
      fillBigPicture(similarPictures[id]);
    });
    pictureElement.addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        fillBigPicture(similarPictures[id]);
      }
    });
  });
  pictureBlock.appendChild(pictureListFragment);
};

export {renderSimilarPicture};
