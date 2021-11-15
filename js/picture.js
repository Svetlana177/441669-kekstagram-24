import {fillBigPicture} from './big-picture.js';
import {isEnterKey} from './utils/is-key-values.js';
import {debounce} from './utils/debounce.js';

const pictureBlock = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const getRandomPicture = () => Math.random() - 0.5;

const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');
const filterForm = document.querySelector('.img-filters__form');
const discussedFilter = document.querySelector('#filter-discussed');
const randomFilter = document.querySelector('#filter-random');
const defaultFilter = document.querySelector('#filter-default');


const pictures = {
  data: [],

  setData(picturesData) {
    this.data = picturesData;
  },
};

const filterDiscussed = (first, second) => {
  if (first.comments < second.comments) {
    return 1;
  } else {
    return -1;
  }
};

const filterDefault = (first, second) => {
  if (first.id > second.id) {
    return 1;
  } else {
    return -1;
  }
};

const renderSimilarPicture = (similarPictures) => {
  const pictureItems = pictures.data;
  const pictureListFragment = document.createDocumentFragment();
  pictureItems.slice(0, similarPictures).forEach(({id, url, likes, comments}) => {
    const pictureElement = userPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length.toString();
    pictureListFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => {
      fillBigPicture(pictureItems[id]);
    });
    pictureElement.addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        fillBigPicture(pictureItems[id]);
      }
    });
  });
  pictureBlock.appendChild(pictureListFragment);
};

const removeFilter = () => {
  discussedFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  defaultFilter.classList.remove('img-filters__button--active');
};

const clearPicture = () => {
  const picture = document.getElementsByClassName('picture');
  let numberPicture;
  while ((numberPicture = picture[0])) {
    numberPicture.parentNode.removeChild(numberPicture);
  }
};

const onButtonClick = () => {
  filterForm.addEventListener('click', (evt) => {
    const makeDebounce = debounce(() => renderSimilarPicture());
    const makeRandomDebounce = debounce(() => renderSimilarPicture(10));
    if (evt.target.id === 'filter-default') {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(filterDefault);
      makeDebounce();
    }
    if (evt.target.id === 'filter-discussed') {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(filterDiscussed);
      makeDebounce();
    }
    if (evt.target.id === 'filter-random') {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(getRandomPicture);
      makeRandomDebounce();
    }
  });
};

export {renderSimilarPicture, pictures, onButtonClick};
