import {showForm, showAlert} from './utils/data_exchange.js';
import {clearForm, resetFilter} from './form.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось получить изображения. Обновите страницу');
      }
    })
    .then((pictures) => {
      onSuccess(pictures);
    });

};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        clearForm();
        resetFilter();
        showForm();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
        clearForm();
        resetFilter();
        showForm(false);
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
