import {isEscapeKey} from './utils/is-key-values.js';
import {checkStringLength} from './utils/check-string-length.js';

const userModalElement = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const textDescription = document.querySelector('.text__description');

const userModalCloseButton = document.querySelector('#upload-cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  userModalElement.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', (onPopupEscKeydown));
  });
}

//чистим форму
const clearForm = () => {
  userModalElement.value = '';
  //консоль выдает ошибку Uncaught TypeError: Cannot read properties of null (reading 'reset')
  document.getElementById(' upload-file').reset();
};

function closeUserModal() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  clearForm();

  document.removeEventListener('keydown', (onPopupEscKeydown));
}

userModalElement.addEventListener('click', () => {
  openUserModal();
});

userModalCloseButton.addEventListener('click', () => {
  closeUserModal();
});


const textHashtag = document.querySelector('.text__hashtags');
//console.log(textHashtag);
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 5;
const regularValue = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// отмена обработчика Esc при фокусе
textHashtag.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

textHashtag.addEventListener('input', () => {
  const hashtagText = textHashtag.value;
  //console.log(hashtagText);
  const hashtagMass = hashtagText.split(' ');
  //console.log('bin', hashtagMass[i].length);

  for (let i = 0; i < hashtagMass.length; i++) {
    // console.log(hashtagMass[i].length);
    //let hashtagTextToLowerCase = hashtagMass[i].toLowerCase();
    if (hashtagMass === '#') {
      textHashtag.setCustomValidity('Хэш-тег не может состоять только из одной решётки.');
      textHashtag.classList.add('validation__error');
    }
    if (hashtagMass[i].length < MIN_HASHTAG_LENGTH) {
      textHashtag.setCustomValidity('Введите не менее 2двух символов');
      textHashtag.classList.add('validation__error');
    }
    if (hashtagMass[i].length > MAX_HASHTAG_LENGTH) {
      textHashtag.setCustomValidity('Введите не более 20 символов');
      textHashtag.classList.add('validation__error');
      //console.log(hashtagMass[i]);
    }
    if (hashtagMass.length > MAX_HASHTAG_COUNT) {
      textHashtag.setCustomValidity('Нельзя указать больше 5 хэш-тегов');
      textHashtag.classList.add('validation__error');
    }
    if (regularValue.test(textHashtag)) {
      textHashtag.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
      textHashtag.classList.add('validation__error');
    } else {
      //сбросить значение поля, если это значение стало корректно.
      textHashtag.setCustomValidity('');
      textHashtag.classList.remove('validation__error');
    }
    // проверять валидность поля на каждый ввод символа
    textHashtag.reportValidity();
  }
});

textDescription.addEventListener('input', () => {
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
});

