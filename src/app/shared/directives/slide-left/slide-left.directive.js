
(function() {
  'use strict';

  angular
    .module('axier.shared.directives')
    .directive('slideLeft', slideLeft);

  /** @ngInject */
  function slideLeft() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/shared/directives/slide-left/slide-left.html',
      scope: {
        "show": '=',
        "panelTitle": '=',
        "dirty": '=',
        "width": "@"
      },
      link: function(scope) {
        scope.showPanel = false;
      },
      controller: function() {
        // var vm = this;

        // $scope.$watch('show', function(nv, ov) {
        //   if (nv) {
        //     $scope.showPanel = true;
        //     // $('body').addClass('overflow-y-hidden');
        //   } else {
        //     $scope.showPanel = false;
        //     // $('body').removeClass('overflow-y-hidden');
        //   }
        // });
      }
    }
  }
})();