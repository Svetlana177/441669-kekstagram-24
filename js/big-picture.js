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

const showFirstComments = () => {
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

const showMoreComments = () => {
  let moreComments = socialComments.children.length + MAXCOMMENTS;
  const commentsPart = commentsArr.slice(socialComments.children.length, moreComments);
  fillComments(commentsPart);
  if (moreComments >= commentsArr.length) {
    moreComments = commentsArr.length;
    commentsLoader.classList.add('hidden');
    socialCommentCount.firstChild.textContent = `${moreComments} из `;
  }
  socialCommentCount.firstChild.textContent = `${moreComments} из `;
};

const fillBigPicture = (pictureId) => {
  clearSocialComments();
  commentsArr = pictureId.comments;
  img.src = pictureId.url;
  likes.textContent = pictureId.like;
  commentsCount.textContent = pictureId.comments.length.toString();
  description.textContent = pictureId.description;
  showFirstComments();
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
  bodyTag.classList.add('.modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.addEventListener('click', closeBigPicture);
  bigPictureClose.addEventListener('keydown', checkEnterKey);
  commentsLoader.addEventListener('click', showMoreComments);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyTag.classList.remove('.modal-open');
  clearSocialComments();

  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.removeEventListener('click', closeBigPicture);
  bigPictureClose.removeEventListener('keydown', checkEnterKey);
  commentsLoader.removeEventListener('click', showMoreComments);
}

export {fillBigPicture, bodyTag};
