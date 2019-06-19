(function () {
  'use strict';

  angular
    .module('axier.app.users')
    .directive('userDetails', userDetails);

  /** @ngInject */
  function userDetails() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/modules/users/user-details/user-details.html',
      controllerAs: 'vm',
      controller: function ($scope, $state, UsersService, Popeye) {
        var vm = this;

        vm.dom = {
          "user": {},
          "tab": 1,
          "isnew": false
        }

        vm.fns = {
          getUser: function (user_id) {
            if (user_id === -1) {

            } else {
              UsersService.get(user_id).then(function (res) {
                angular.copy(res, vm.dom.user);
              })
            }
          },
          patchUser: function (user_id, user) {
            if (user_id === -1) {
              UsersService.post(user).then(function (res) {
                user._id = res.data;
                $state.go('app.base.users.list', { 'updateId': -1, 'updateUser': user });
              });
            } else if (user_id) {
              UsersService.patch(user_id, user).then(function (res) {
                $state.go('app.base.users.list', { 'updateId': user_id, 'updateUser': user });
              })
            }
          },
          deleteUser: function (user_id) {
            var modal = Popeye.openModal({
              templateUrl: 'app/modules/users/users.delete.tpl.html',
              controller: function ($scope) {

                $scope.dom = {
                  "name": ""
                }

              }
            });

            // modal.closed.then(function (confirm) {
            //   if (confirm) {
            //     UsersService.delete(user_id).then(function (res) {
            //       //updating user in user list to avoid refresh or unnecessary GET request
            //       $state.go('app.base.users.list', { 'updateId': user_id, 'updateUser': user });

            //     });
            //   }
            // });
          }
        }

        $scope.$watch('$state.params.id', function (nv) {
          if (angular.isDefined(nv) && nv != -1) {
            vm.dom.isnew = false;
            vm.fns.getUser(nv);
          } else if (nv == -1) {
            vm.dom.user = { "_id": -1 }
            vm.dom.isnew = true;
          }
        });

      }
    }
  }
})();
