'use strict';

(function () {

  window.addEventListener('DOMContentLoaded', function () {

    var accBlockInfo = document.querySelector('.footer__nav-info');
    var accBlockContact = document.querySelector('.footer__contact');
    var btnFooterInfo = document.querySelector('.footer__nav-btn-info');
    var btnFooterContact = document.querySelector('.footer__nav-btn-contact');

    var getOpenAccInfo = function () {
      accBlockInfo.classList.toggle('footer__nav-info--open');
    };

    var getOpenAccContact = function () {
      accBlockContact.classList.toggle('footer__contact--open');
    };

    btnFooterInfo.addEventListener('click', getOpenAccInfo);

    btnFooterContact.addEventListener('click', getOpenAccContact);


    var inputPhone = document.querySelectorAll('input[type="tel"]');
    var im = new Inputmask('+7 (999) 999-99-99');
    im.mask(inputPhone);


    var headerCall = document.querySelector('.header__call');
    var overlay = document.querySelector('.modal-overlay');
    var modal = document.querySelector('.modal');
    var nameModal = modal.querySelector('[name=modalName]');
    var phone = modal.querySelector('[name=modalPhone]');
    var message = modal.querySelector('[name=modalMessage]');
    var closeModal = modal.querySelector('.modal__close');
    var modalFormBtn = modal.querySelector('.modal__form-btn');
    var bodyFixed = 'fixed';
    var bodyNoFixed = '';
    var bodyFullWidth = '100%';
    var bodyInitialWidth = 'initial';


    var isStorageSupport = true;
    var storageName = '';
    var storagePhone = '';
    var storageMessage = '';

    try {
      storageName = localStorage.getItem('name');
      storagePhone = localStorage.getItem('phone');
      storageMessage = localStorage.getItem('message');
    } catch (err) {
      isStorageSupport = false;
    }

    if (isStorageSupport) {
      if (storageName) {
        nameModal.value = storageName;
      }
      if (storagePhone) {
        phone.value = storagePhone;
      }
      if (storageMessage) {
        message.innerText = storageMessage;
      }
    }

    var sendHandler = function (evt) {
      if (!nameModal.value) {
        evt.preventDefault();
        nameModal.focus();
      } else if (nameModal.value && !phone.value) {
        evt.preventDefault();
        phone.focus();
      } else if (nameModal.value && phone.value && !message.value) {
        evt.preventDefault();
        message.focus();
      } else {
        localStorage.setItem('name', nameModal.value);
        localStorage.setItem('phone', phone.value);
        localStorage.setItem('message', message.value);
      }
    };

    modalFormBtn.addEventListener('click', sendHandler);

    headerCall.addEventListener('click', function (evt) {
      evt.preventDefault();
      modal.classList.add('modal--show');
      overlay.classList.add('modal-overlay--show');
      document.body.style.position = bodyFixed;
      document.body.style.width = bodyFullWidth;
      nameModal.focus();
    });

    closeModal.addEventListener('click', function (evt) {
      evt.preventDefault();
      modal.classList.remove('modal--show');
      overlay.classList.remove('modal-overlay--show');
      document.body.style.position = bodyNoFixed;
      document.body.style.width = bodyInitialWidth;
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        if (modal.classList.contains('modal--show')) {
          modal.classList.remove('modal--show');
          overlay.classList.remove('modal-overlay--show');
          document.body.style.position = bodyNoFixed;
          document.body.style.width = bodyInitialWidth;
        }
      }
    });

    overlay.addEventListener('click', function () {
      modal.classList.remove('modal--show');
      overlay.classList.remove('modal-overlay--show');
      document.body.style.position = bodyNoFixed;
      document.body.style.width = bodyInitialWidth;
    });


    var links = document.querySelectorAll('a[href^="#"]');
    for (let link of links) {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();
        var id = link.getAttribute('href');

        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    };
  });
})();
