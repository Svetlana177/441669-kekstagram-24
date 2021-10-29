import './data.js';
import {createAllComments} from './data.js';
import {userPictureItem} from './picture.js';
import {isEscapeKey} from './utils/is-escape-key.js';

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
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const socialCommentFragment = document.createDocumentFragment();
const socialCommentItem = createAllComments();

const createComment = () => {
  socialComments.innerHTML = '';
  socialCommentItem.forEach(({avatar, name, message}) => {
    const commentElement = socialComment.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    socialCommentFragment.appendChild(commentElement);
  });

  socialComments.appendChild(socialCommentFragment);
  return socialComments;
};

const closeSection = () => {
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  bodyTag.classList.remove('modal-open');
};

const onEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSection();
  }
};

const closeBigPicture = () => {
  //добавление обработчика
  document.addEventListener('keydown', onEscapeKey);

  //удаление обработчика
  bigPictureCancel.addEventListener('click', () => {
    closeSection();
    document.removeEventListener('keydown', onEscapeKey);
  });
};

const openBigPicture = (pictureId) => {
  img.src = userPictureItem[pictureId].url;
  likes.textContent = userPictureItem[pictureId].like.toString();
  commentsCount.textContent = userPictureItem[pictureId].comments.toString();
  description.textContent = userPictureItem[pictureId].description;
  createComment();
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bodyTag.classList.add('.modal-open');
  closeBigPicture();
};

export { openBigPicture };
