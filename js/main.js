import {renderSimilarPicture} from './picture.js';
import {closeUserModal} from './modal.js';
import {setUserFormSubmit} from './form.js';
import {getData} from './api.js';


getData((picture) => {
  renderSimilarPicture(picture);
});

setUserFormSubmit(closeUserModal);
