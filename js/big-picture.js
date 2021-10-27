import './data.js';
import { createAllComments, createPhotoDescription } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bodyTag = document.querySelector('body');
const bigPictureImg = document.querySelector('.big-picture__img');
const img = bigPictureImg.querySelector('img');
const likes = bigPictureImg.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComment = bigPicture.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const socialCommentFragment = document.createDocumentFragment();
const socialCommentItem = createAllComments();

const createComment = () => {
  socialComments.innerHTML= '';
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

const openBigPicture = (photo) => {
  bodyTag.classList.add('.modal-open');
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  img.src = photo.url;
  likes.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  description.textContent = photo.description;
  createComment();
};
openBigPicture();

