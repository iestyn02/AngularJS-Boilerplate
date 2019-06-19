(function () {
  'use strict';

  angular
    .module('axier')
    .provider('profileProvider', profileProvider);

  /** @ngInject */
  function profileProvider() {

    var $cookies;

    angular.injector(['ngCookies']).invoke([
      '$cookies', function (_$cookies) {
        $cookies = _$cookies;
      }
    ]);

    this.$get = ['$injector', function ($injector) {
      var $rootScope = $injector.get('$rootScope');

      var service = {
        setProfile: setProfile,
        profile: {},
      };

      return service;

      function setProfile(profile) {
        this.profile = profile;
      }

    }];
  }
})();
