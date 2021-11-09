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

//module10-task1
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const STEP = 25;
const MINSTEPVALUE = 25;
const MAXSTEPVALUE = 100;
let currentValue = 100;

scaleControlValue.value = `${currentValue}%`;

const makeControlSmaller = () => {
  if (currentValue !== MINSTEPVALUE) {
    currentValue -= STEP;
    scaleControlValue.value = `${currentValue}%`;
    imgUploadPreview.style.transform = `scale(${currentValue / 100})`;
  }
};

const makeControlBigger = () => {
  if (currentValue !== MAXSTEPVALUE) {
    currentValue += STEP;
    scaleControlValue.value = `${currentValue}%`;
    imgUploadPreview.style.transform = `scale(${currentValue / 100})`;
  }
};

//nouislider
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');

const SLIDER_PARAMETERS = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => `${value}%`,
      from: (value) => Number(value.replace('%', '')),
    },
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => `${value}px`,
      from: (value) => Number(value.replace('px', '')),
    },
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
};
const FILTERS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const addEffect = (evt) => {
  const currentEffectValue = evt.target.value;
  if (evt.target.classList.contains('effects__radio')) {
    effectLevel.classList.remove('hidden');
    if (currentEffectValue === 'none') {
      imgUploadPreview.style.filter = '';
      imgUploadPreview.className = '';
      effectLevel.classList.add('hidden');
    } else {
      noUiSlider.create(effectLevelSlider, SLIDER_PARAMETERS[currentEffectValue]);
      imgUploadPreview.className = `effects__preview--${currentEffectValue}`;
      effectLevelSlider.noUiSlider.on('update', (value, handle, unencoded) => {
        imgUploadPreview.style.filter = `${FILTERS[currentEffectValue]}(${value[handle]})`;
        effectLevelValue.value = unencoded[handle];
      });
    }
  } else if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
};

function openUserModal() {
  userModalElement.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscKeydown);
    textHashtag.addEventListener('keydown', stopEvent);
    textDescription.addEventListener('keydown', stopEvent);
    textHashtag.addEventListener('input', checkTextHashtags);
    textDescription.addEventListener('input', checkComments);
    scaleControlSmaller.addEventListener('click', makeControlSmaller);
    scaleControlBigger.addEventListener('click', makeControlBigger);
    effectsList.addEventListener('click', addEffect);
  });
}

function closeUserModal() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  clearForm();

  document.removeEventListener('keydown', onPopupEscKeydown);
  textHashtag.removeEventListener('keydown', stopEvent);
  textDescription.removeEventListener('keydown', stopEvent);

  textHashtag.removeEventListener('input', checkTextHashtags);
  textDescription.removeEventListener('input', checkComments);
  scaleControlSmaller.removeEventListener('click', makeControlSmaller);
  scaleControlBigger.removeEventListener('click', makeControlBigger);
  effectsList.removeEventListener('click', addEffect);
}

userModalElement.addEventListener('click', openUserModal);
userModalCloseButton.addEventListener('click', closeUserModal);
