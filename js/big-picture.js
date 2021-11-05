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
const MAXCOMMENTS = 5;
const socialCommentFragment = document.createDocumentFragment();
let commentsArr = [];

//чистим комменты
const clearSocialComments = () => {
  socialComments.innerHTML = '';
};

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

const firstFiveComments = () => {
  const totalComments = commentsArr.length;
  const commentsPart = commentsArr.slice(0, 5);
  fillComments(commentsPart);
  commentsLoader.classList.remove('hidden');
  socialCommentCount.firstChild.textContent = `${MAXCOMMENTS} из `;
  if (totalComments <= MAXCOMMENTS) {
    commentsLoader.classList.add('hidden');
    socialCommentCount.firstChild.textContent = `${totalComments} из `;
  }
};

const showFiveComments = () => {

  let plusFive = socialComments.children.length + MAXCOMMENTS;
  const commentsPart = commentsArr.slice(socialComments.children.length, plusFive);
  fillComments(commentsPart);
  if (plusFive >= commentsArr.length) {
    plusFive = commentsArr.length;
    commentsLoader.classList.add('hidden');
    socialCommentCount.firstChild.textContent = `${plusFive} из `;
  }
  socialCommentCount.children.textContent = `${plusFive} из `;
};

const fillBigPicture = (pictureId) => {
  clearSocialComments();
  commentsArr = userPictureItem[pictureId].comments;
  img.src = userPictureItem[pictureId].url;
  likes.textContent = userPictureItem[pictureId].like.toString();
  commentsCount.textContent = userPictureItem[pictureId].comments.length.toString();
  description.textContent = userPictureItem[pictureId].description;
  commentsLoader.addEventListener('click', showFiveComments);
  firstFiveComments();
  openBigPicture();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  bodyTag.classList.add('.modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
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

export {fillBigPicture};
