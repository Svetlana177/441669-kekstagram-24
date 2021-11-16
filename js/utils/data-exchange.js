import {bodyTag} from '../big-picture.js';
import {isEscapeKey} from './is-key-values.js';

const TIME = 4000;
const errorTemplate = document.querySelector('#error').content;
const errorContainer = errorTemplate.querySelector('.error');
const successTemplate = document.querySelector('#success').content;
const successContainer = successTemplate.querySelector('.success');

function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    this.style.display = 'none';
  }
}

function onContains(evt) {
  if (evt.target.contains(this)) {
    this.style.display = 'none';
  }
}

const showForm = (success = true) => {
  const message = success ? successContainer.cloneNode(true) : errorContainer.cloneNode(true);
  bodyTag.appendChild(message);
  message.style.zIndex = 5;
  const button = message.querySelector('button');
  const keydownFunc = onMessageEscKeydown.bind(message);

  button.addEventListener('click', () => {
    message.style.display = 'none';
    document.removeEventListener('keydown', keydownFunc);
  });

  document.addEventListener('keydown', keydownFunc);
  document.addEventListener('click', onContains.bind(message));
};

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

export {showForm, showAlert};
