(function () {
  'use strict';

  angular
    .module('axier.shared.directives')
    .directive('searchBox', searchBox);

  /** @ngInject */
  function searchBox(helpersService, $state) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/shared/directives/search-box/search-box.html',
      scope: {
        "isOpen": "="
      },
      controllerAs: 'vm',
      controller: function ($scope, $timeout, authService) {

        var vm = this;

        vm.dom = {
          "test": "test"
        }

        vm.fns = {
          logout: authService.logOut
        }

        $scope.dom = {
          "inputSearch": document.getElementById('search__input'),
          "searchModel": "",
          "playVideo": function (url) {
            if (helpersService.validateUrl(url)) {
              $state.go('app.base.player', {
                "url": url
              });
              $scope.isOpen = false;
            } else {
              alert('invalid url');
            };
          },
          "videosList": []
        }

        function initEvents() {
          document.addEventListener('keyup', function (ev) {
            // escape key.
            if (ev.keyCode == 27) {
              $scope.isOpen = false;
              $scope.$apply();

            }
          });
        }

        $scope.$watch('isOpen', function (nv) {
          if (nv) {
            $timeout(function () {
              $scope.dom.inputSearch.focus();
            }, 500);
          } else {
            $scope.dom.inputSearch.blur();
          }
        });

        vm.init = function () {
          initEvents();
          // informationService.getVideos().then(function(res) {
          //     angular.copy(res, $scope.dom.videosList);
          // });
        }

        vm.init();
      }
    };
  }
})();
