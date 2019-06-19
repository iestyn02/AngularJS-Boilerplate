(function () {
  'use strict';

  angular
    .module('axier')
    .factory('authService', authService);

  /** @ngInject */
  function authService($q, angularAuth0, APP_URI_CONFIG) {
    var service = {};

    service.checkSession = function () {
      return $q(function (resolve) {
        angularAuth0.checkSession({}, function (err, res) {
          if (err) {
            if (!localStorage.getItem('access_token')) angularAuth0.authorize();
          } else {
            resolve(res);
          }
        });
      });
    }

    service.setSession = function (authResult) {
      // Set the time that the access token will expire at
      let expires_at = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expires_at);
    }

    service.logOut = function () {
      localStorage.clear();

      angularAuth0.logout({
        return_to: window.location.href
      });

    }

    return service;

  };
})();
