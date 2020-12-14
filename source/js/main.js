'use strict';

(function () {

  window.addEventListener('DOMContentLoaded', function () {

    var footerNav = document.querySelector('.footer__nav');
    var accBlockInfo = document.querySelector('.footer__nav-info');
    var accBlockContact = document.querySelector('.footer__contact');
    var btnFooterInfo = document.querySelector('.footer__nav-btn-info');
    var btnFooterContact = document.querySelector('.footer__nav-btn-contact');
    var btnTitleInfo = document.querySelector('.footer__nav-title--info');
    var btnTitleContact = document.querySelector('.footer__nav-title--contact');

    footerNav.classList.remove('footer__nav--nojs');

    var getOpenAccInfo = function () {
      accBlockInfo.classList.add('footer__nav-info--open');
      accBlockContact.classList.remove('footer__contact--open');
    };

    var getOpenAccContact = function () {
      accBlockContact.classList.add('footer__contact--open');
      accBlockInfo.classList.remove('footer__nav-info--open');
    };

    btnFooterInfo.addEventListener('click', getOpenAccInfo);

    btnFooterContact.addEventListener('click', getOpenAccContact);

    btnTitleInfo.addEventListener('click', getOpenAccInfo);

    btnTitleContact.addEventListener('click', getOpenAccContact);


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


    var animation = function (object) {
      var start = performance.now();
      requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / object.duration;
        if (timeFraction > 1) {
          timeFraction = 1;
        }
        var progress = object.timing(timeFraction);
        object.draw(progress);
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    };

    var scrollTo = function (evt) {
      evt.preventDefault();
      var targetElement = document.querySelector(evt.currentTarget.href.replace(/[^#]*(.*)/, '$1'));
      var ua = navigator.userAgent;
      var browserIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
      var targetY;
      if (browserIe) {
        targetY = targetElement.getBoundingClientRect().top;
      } else {
        targetY = targetElement.getBoundingClientRect().y;
      }
      var startY = window.pageYOffset;

      var parameters = {
        duration: 1500,
        timing: function (timeFraction) {
          return timeFraction;
        },
        draw: function (progress) {
          window.scrollTo(0, startY + progress * targetY);
        }
      };

      animation(parameters);
    };

    var links = document.querySelectorAll('.promo__link, .promo__scroll');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', scrollTo);
    }
  });
})();
