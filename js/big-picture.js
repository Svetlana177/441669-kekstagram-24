import './data.js';
import {userPictureItem} from './picture.js';
import {isEscapeKey} from './utils/is-escape-key.js';
import {isEnterKey} from './utils/is-enter-key.js';

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

const fillBigPicture = (pictureId) => {
  img.src = userPictureItem[pictureId].url;
  likes.textContent = userPictureItem[pictureId].like.toString();
  commentsCount.textContent = userPictureItem[pictureId].comments.toString();
  description.textContent = userPictureItem[pictureId].description;
  fillComments(userPictureItem[pictureId].comments);
  openBigPicture();
};

/*
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyTag.classList.remove('modal-open');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  Удаление обработчика
  document.removeEventListener('keydown', onEscapeKey);
bigPictureCancel.removeEventListener('click', () => closeBigPicture);
};
*/

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//чистим комменты
const clearSocialComments = () => {
  socialComments.innerHTML = '';
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bodyTag.classList.add('.modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bodyTag.classList.remove('.modal-open');
  clearSocialComments();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

bigPictureClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});

export { fillBigPicture };
