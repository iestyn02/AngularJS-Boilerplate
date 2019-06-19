(function () {
  'use strict';

  angular
    .module('axier', [
      'loadTpls',

      // Load Core Libraries
      'auth0.auth0',
      'ui.router',
      'oc.lazyLoad',
      'ngAnimate',
      'ngCookies',
      'pathgather.popeye',
      'angular-loading-bar',

      // Load App Modules
      'axier.app'
    ]);
})();
