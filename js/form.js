import {isEscapeKey} from './utils/is-key-values.js';
import {checkStringLength} from './utils/check-string-length.js';

const userModalElement = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const textDescription = document.querySelector('.text__description');
const userModalCloseButton = document.querySelector('#upload-cancel');

const textHashtag = document.querySelector('.text__hashtags');
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const regularValue = /^#[A-Za-zА-Яа-яЁё0-9#]{1,19}$|(^$)/;
const symbols = /^#\S*#\S*/;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

// запрет на закрытие по Esc при фокусе
const stopEvent = (evt) => {
  evt.stopPropagation();
};

const checkEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    stopEvent();
  }
};

//чистим форму
const clearForm = () => {
  userModalElement.value = '';
  document.querySelector('.img-upload__form').reset();
  textHashtag.classList.remove('validation__error');
};

const checkTextHashtags = () => {
  const hashtagText = textHashtag.value.toLowerCase();
  const hashtagMass = hashtagText.split(' ');
  const tempHashtagMass = [];
  textHashtag.setCustomValidity('');
  textHashtag.classList.remove('validation__error');
  for (let i = 0; i < hashtagMass.length; i++) {
    if (hashtagMass[i] === '#') {
      textHashtag.setCustomValidity('Хэш-тег не может состоять только из одной решётки.');
      textHashtag.classList.add('validation__error');
    } else if (!regularValue.test(hashtagMass[i])) {
      textHashtag.setCustomValidity('Строка после решётки должна состоять из 20 букв и чисел, включая хештег и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
      textHashtag.classList.add('validation__error');
    } else if (symbols.test(hashtagMass[i])) {
      textHashtag.setCustomValidity('Хэш-теги должны разделяться пробелами.');
      textHashtag.classList.add('validation__error');
    } else if (hashtagMass.length > MAX_HASHTAG_COUNT) {
      textHashtag.setCustomValidity('Нельзя указать больше 5 хэш-тегов');
      textHashtag.classList.add('validation__error');
    } else if (tempHashtagMass.includes(hashtagMass[i])) {
      textHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
      textHashtag.classList.add('validation__error');
    } else {
      tempHashtagMass.push(hashtagMass[i]);
    }
    // проверять валидность поля на каждый ввод символа
    textHashtag.reportValidity();
  }
};


const checkComments = () => {
  const commentLength = checkStringLength(textDescription.value, MAX_COMMENT_LENGTH);
  if (!commentLength) {
    textDescription.setCustomValidity('');
    textDescription.classList.add('validation__error');
    textDescription.setCustomValidity(`Длина комментария не может составлять больше 140 символов. Лишних символов: ${textDescription.value.length - MAX_COMMENT_LENGTH}.`);
  } else {
    textDescription.setCustomValidity('');
    textDescription.classList.remove('validation__error');
  }
  textDescription.reportValidity();
};

function openUserModal() {
  userModalElement.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscKeydown);
    textHashtag.addEventListener('keydown', checkEscapeKey);
    textDescription.addEventListener('keydown', checkEscapeKey);
    textHashtag.addEventListener('input', checkTextHashtags);
    textDescription.addEventListener('input', checkComments);
  });
}

function closeUserModal() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  clearForm();

  document.removeEventListener('keydown', onPopupEscKeydown);
  textHashtag.removeEventListener('keydown', checkEscapeKey);
  textDescription.removeEventListener('keydown', checkEscapeKey);

  textHashtag.removeEventListener('input', checkTextHashtags);
  textDescription.removeEventListener('input', checkComments);
}

userModalElement.addEventListener('click', openUserModal);
userModalCloseButton.addEventListener('click', closeUserModal);
