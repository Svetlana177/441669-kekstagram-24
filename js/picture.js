import { photoDescription } from './data.js';

const pictureBlock = document.querySelector('.pictures');

const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPictureItem = photoDescription();

const pictureListFragment = document.createDocumentFragment();

userPictureItem.forEach(({url, like, comments}) => {
  const pictureElement = userPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = like.toString();
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureListFragment.appendChild(pictureElement);
});

pictureBlock.appendChild(pictureListFragment);


