import {photoDescription} from "./data.js";

const bigPicture = document.querySelector('.big-picture');
const bodyTag = document.querySelector('body');


bigPicture.classList.remove('hidden');
bodyTag.classList.add('.modal-open');
const bigPictureImg = document.querySelector('.big-picture__img');
const img = bigPictureImg.querySelector('img');
const likes = bigPictureImg.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComment = bigPicture.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');

const pictureListFragment = document.createDocumentFragment();
const userPictureItem = photoDescription();

userPictureItem.forEach(({avatar, name, message}) => {
  const commentElement = socialComment.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  pictureListFragment.appendChild(commentElement);
});


socialComments.appendChild(pictureListFragment);
