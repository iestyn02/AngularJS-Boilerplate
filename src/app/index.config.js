
(function () {
  'use strict';

  angular
    .module('axier')
    .config(config);

  /** @ngInject */
  function config($httpProvider, $compileProvider, angularAuth0Provider, $ocLazyLoadProvider, cfpLoadingBarProvider, APP_URI_CONFIG) {

    $httpProvider.interceptors.push('AuthInterceptorService');

    //to use debugger if published call this method in the console: angular.reloadWithDebugInfo();
    $compileProvider.debugInfoEnabled(false);

    angularAuth0Provider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      responseType: 'token id_token',
      audience: AUTH0_AUDIENCE,
      redirect: false,
      redirectUri: AUTH0_CALLBACK_URL || APP_URI_CONFIG.appBaseUrl + 'callback',
      scope: 'openid profile'
    });

    $ocLazyLoadProvider.config({
      'debug': true, // For debugging 'true/false'
      'events': true, // For Event 'true/false'
      'modules': [{ // Set modules initially
        name: 'axier.app', // State1 module
        files: ['app_636f7265.js']
      }]
    });

    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;

  }

})();
