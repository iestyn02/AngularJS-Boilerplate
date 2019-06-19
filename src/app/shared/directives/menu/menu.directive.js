(function() {
  'use strict';

  angular
    .module('axier.shared.directives')
    .directive('appMenu', appMenu);

  /** @ngInject */
  function appMenu($state) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/shared/directives/menu/menu.html',
      link: function(scope, ele, attr) {
        scope.$state = $state;
      },
      controller: function($scope, $timeout) {
        var vm = this;

        vm.init = function() {

        }

        vm.init();
      }
    };
  }
})();