import {bodyTag} from '../big-picture.js';
import {isEscapeKey} from './is-key-values.js';

const errorTemplate = document.querySelector('#error').content;
const errorContainer = errorTemplate.querySelector('.error');
const successTemplate = document.querySelector('#success').content;
const successContainer = successTemplate.querySelector('.success');

const formSuccess = () => {
  const successMessage = successContainer.cloneNode(true);
  bodyTag.appendChild(successMessage);
  successMessage.style.zIndex = 5;
  const successButton = successMessage.querySelector('.success__button');

  function onMessageEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.style.display = 'none';
    }
  }

  function onContains(evt) {
    if (evt.target.contains(successMessage)) {
      successMessage.style.display = 'none';
    }
  }

  successButton.addEventListener('click', () => {
    successMessage.style.display = 'none';
    document.removeEventListener('keydown', onMessageEscKeydown);
  });
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onContains);
};

const formError = () => {
  const errorMessage = errorContainer.cloneNode(true);
  errorMessage.style.zIndex = 5;
  bodyTag.appendChild(errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');

  function onErrorEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessage.style.display = 'none';
    }
  }

  function onContains(evt) {
    if (evt.target.contains(errorMessage)) {
      errorMessage.style.display = 'none';
    }
  }

  errorButton.addEventListener('click', () => {
    errorMessage.style.display = 'none';
    document.removeEventListener('keydown', onErrorEscKeydown);
  });
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onContains);
};

const TIME = 6000;
const showAlert = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.position = 'absolute';
  alertMessage.style.zIndex = 5;
  alertMessage.style.left = '100px';
  alertMessage.style.top = '50%';
  alertMessage.style.right = '100px';
  alertMessage.style.fontSize = '20px';
  alertMessage.style.lineHeight = '27px';
  alertMessage.style.fontWeight = '600';
  alertMessage.style.padding = '20px';
  alertMessage.style.borderRadius = '15px';
  alertMessage.style.textAlign = 'center';
  alertMessage.style.backgroundColor = '#000000';
  alertMessage.style.color = '#ff0000';
  alertMessage.textContent = message;
  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, TIME);
};

export {formSuccess, formError, showAlert};
