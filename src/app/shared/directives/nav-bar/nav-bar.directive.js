(function () {
  'use strict';

  angular
    .module('axier.shared.directives')
    .directive('navigationBar', navigationBar);

  /** @ngInject */
  function navigationBar(profileProvider) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/shared/directives/nav-bar/nav-bar.html',
      link: function (scope) {
        scope.profile = {};

        var init = function () {
          angular.copy(profileProvider.profile, scope.profile);
        }

        init();
      }
    };
  }
})();
