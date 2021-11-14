import {fillBigPicture} from './big-picture.js';
import {isEnterKey} from './utils/is-key-values.js';
import {debounce} from './utils/debounce.js';

//Контейнер для изображений от других пользователей
const pictureBlock = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = {
  data: [],

  setData(picturesData) {
    this.data = picturesData;
  },
};

const filterDiscussed = (first, second) => {
  if (first.likes < second.likes) {
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

const filterRandom = () => Math.random() - 0.5;

const renderSimilarPicture = (similarPictures) => {
  const allPictures = pictures.data;
  const pictureListFragment = document.createDocumentFragment();
  allPictures.slice(0, similarPictures).forEach(({id, url, likes, comments}) => {
    const pictureElement = userPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length.toString();
    pictureListFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => {
      fillBigPicture(allPictures[id]);
    });
    pictureElement.addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        fillBigPicture(allPictures[id]);
      }
    });
  });
  pictureBlock.appendChild(pictureListFragment);
};

const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');
const filterForm = document.querySelector('.img-filters__form');
const discussedFilter = document.querySelector('#filter-discussed');
const randomFilter = document.querySelector('#filter-random');
const defaultFilter = document.querySelector('#filter-default');

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
    const processDebounce = debounce(() => renderSimilarPicture());
    const processRandomDebounce = debounce(() => renderSimilarPicture(10));

    if (evt.target.classList.contains('filter-discussed')) {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(filterDiscussed);
      processDebounce();

    }
    if (evt.target.classList.contains('filter-random')) {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(filterRandom);
      processRandomDebounce();

    }
    if (evt.target.classList.contains('filter-default')) {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(filterDefault);
      processDebounce();
    }
  });
};

export {renderSimilarPicture, pictures, onButtonClick};
