import {clearForm, userModalElement} from './form.js';
import {isEscapeKey} from './utils/is-key-values.js';
import {bodyTag} from './big-picture.js';
const userModalCloseButton = document.querySelector('#upload-cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
}

function openUserModal() {
  userModalElement.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    bodyTag.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscKeydown);
  });
}

function closeUserModal() {
  clearForm();
  imgUploadOverlay.classList.add('hidden');
  bodyTag.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

userModalElement.addEventListener('click', openUserModal);
userModalCloseButton.addEventListener('click', closeUserModal);

export {openUserModal, closeUserModal, onPopupEscKeydown};

