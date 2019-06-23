(function () {
  'use strict';

  angular
    .module('axier')
    .constant('APP_URI_CONFIG', {
      "apiBaseUrl": 'http://localhost:3689',
      "appBaseUrl": window.location.origin
    });

})();
