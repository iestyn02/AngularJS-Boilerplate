(function () {
  'use strict';

  angular
    .module('axier.constants', [])
    .provider('assets', assetsProvider);

  /** @ngInject */
  function assetsProvider($injector) {

    var assetsConstants = {

    };

    //return new Assets(assetsConstants);
  }
})();
