import './data.js';
import {userPictureItem} from './picture.js';
import {isEnterKey, isEscapeKey} from './utils/is-key-values.js';

const bigPicture = document.querySelector('.big-picture');
const bodyTag = document.querySelector('body');
const bigPictureImg = document.querySelector('.big-picture__img');
const img = bigPictureImg.querySelector('img');
const likes = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComment = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');
const description = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = document.querySelector('.big-picture__cancel');

const socialCommentFragment = document.createDocumentFragment();

const fillComments = (item) => {
  item.forEach(({avatar, name, message}) => {
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    socialCommentFragment.appendChild(commentElement);
  });

  socialComments.appendChild(socialCommentFragment);
  return socialComments;
};

//чистим комменты
const clearSocialComments = () => {
  socialComments.innerHTML = '';
};

const fillBigPicture = (pictureId) => {
  clearSocialComments();
  img.src = userPictureItem[pictureId].url;
  likes.textContent = userPictureItem[pictureId].like.toString();
  commentsCount.textContent = userPictureItem[pictureId].comments.toString();
  description.textContent = userPictureItem[pictureId].description;
  fillComments(userPictureItem[pictureId].comments);
  openBigPicture();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const checkEnterKey = (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
};

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bodyTag.classList.add('.modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.addEventListener('click', closeBigPicture);
  bigPictureClose.addEventListener('keydown', checkEnterKey);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bodyTag.classList.remove('.modal-open');
  clearSocialComments();

  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.removeEventListener('click', closeBigPicture);
  bigPictureClose.removeEventListener('keydown', checkEnterKey);
}

export {fillBigPicture};
