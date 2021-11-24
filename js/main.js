import {onButtonClick, pictures, renderSimilarPicture} from './picture.js';
import {closeUserModal} from './modal.js';
import {setUserFormSubmit} from './form.js';
import {getData} from './api.js';
import  './photo.js';


const getTask = async () => {
  const data = await getData();

  pictures.setData(data);
  renderSimilarPicture();
  onButtonClick();

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  setUserFormSubmit(closeUserModal);
};

getTask();

