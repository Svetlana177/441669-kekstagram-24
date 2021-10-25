import {isEscapeKey} from './utils/is-escape-key.js';

const userModalElement = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
imgUploadOverlay.classList.remove('hidden');
const body = document.querySelector('body');
body.classList.add('modal-open');

const userModalCloseButton = document.querySelector('#upload-cancel');
imgUploadOverlay.classList.add('hidden');
body.classList.remove('modal-open');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};


const openUserModal = () => {
  imgUploadOverlay.classList.remove('hidden');

  document.addEventListener('keydown', (onPopupEscKeydown));
  //Обратите внимание, что при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла #upload-file
  userModalElement.value = '';
};

const closeUserModal = () => {
  imgUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', (onPopupEscKeydown));
};

userModalElement.addEventListener('click', () => {
  openUserModal();
});

userModalCloseButton.addEventListener('click', () => {
  closeUserModal();
});


const textHashtag = document.querySelector('.text__hashtags');
console.log(textHashtag);
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

const regularValue = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

textHashtag.addEventListener('input', () => {
  const hashtagText = textHashtag.value;
  console.log(hashtagText);
  const hashtagMass = hashtagText.split(',');

  for (let i = 0; i < hashtagMass.length; i++) {
    //let hashtagTextToLowerCase = hashtagMass[i].toLowerCase();
    if (hashtagMass[i].length < MIN_HASHTAG_LENGTH) {
      textHashtag.setCustomValidity('Введите не менее 2двух символов');
      console.log(hashtagMass);
      textHashtag.classList.add('validation__error');
    } else if (hashtagMass[i].length > MAX_HASHTAG_LENGTH) {
      textHashtag.setCustomValidity('Введите не более 20 символов');
      textHashtag.classList.add('validation__error');
    }
    if (hashtagMass.length > MAX_HASHTAG_COUNT) {
      textHashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      textHashtag.classList.add('validation__error');
    }
    if (regularValue.test(textHashtag)) {
      textHashtag.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
      textHashtag.classList.add('validation__error');
    } else {
      textHashtag.setCustomValidity('');
      textHashtag.classList.add('validation__error');
    }
    textHashtag.reportValidity();
  }
});


// const MIN_NAME_LENGTH = 2;
// const MAX_NAME_LENGTH = 25;
//
// const userNameInput = document.querySelector('.setup-user-name');
//
// userNameInput.addEventListener('invalid', () => {
//   if (userNameInput.validity.valueMissing) {
//     userNameInput.setCustomValidity('Обязательное поле');
//   } else {
//     userNameInput.setCustomValidity('');
//   }
// });
//
// userNameInput.addEventListener('input', () => {
//   const valueLength = userNameInput.value.length;
//
//   if (valueLength < MIN_NAME_LENGTH) {
//     userNameInput.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
//   } else if (valueLength > MAX_NAME_LENGTH) {
//     userNameInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
//   } else {
//     userNameInput.setCustomValidity('');
//   }
// });
