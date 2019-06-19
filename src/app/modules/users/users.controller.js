(function () {
  'use strict';

  angular
    .module('axier.app.users')
    .controller('UsersController', UsersController);

  /** @ngInject */
  function UsersController($scope, $state, $rootScope, helpersService, UsersService, Users) {
    var vm = this;

    vm.dom = {
      "users": [],
      "user": {
        "name": ""
      },
      "slider": {
        "open": $state.current.name === 'app.base.users.list.details' ? true : false
      },
      "filters": {
        "type": -1
      },
      "sort": {
        "type": '',
        "reverse": false
      }
    }

    vm.fns = {
      filter: function () {
        return function (item) {
          switch (vm.dom.filters.type) {
            case -1:
              return true;
            case 1:
              return item.isAdmin;
            case 2:
              return !item.isAdmin;
            default:
              return false;
          }
        }
      },
      usersOrderBy: function (row_item) {
        switch (vm.dom.sort.type) {
          case 'user_contributions':
            return row_item.open_issues + row_item.commits + row_item.pull_requests;
          case 'open_issues':
            return row_item.open_issues;
          case 'commits':
            return row_item.commits;
          case 'pull_requests':
            return row_item.pull_requests;
          default:
            return true;
        }
      },
      deleteUser: function (user_id) {
        //this is handled by the user-details.directive
      }
    }

    $rootScope.$on('$stateChangeStart', function (e, to, toParams, from, fromParams) {
      if (to.name === 'app.base.users.list.details') {
        vm.dom.slider.open = true;
      } else if (from.name === 'app.base.users.list.details') {
        if (toParams.updateId) {
          //updating user in user list to avoid refresh or unnecessary GET request
          if (toParams.updateId == -1) {
            vm.dom.users.unshift(toParams.updateUser)
          } else {
            angular.copy(toParams.updateUser, vm.dom.users[helpersService.getIndexInArray(vm.dom.users, '_id', toParams.updateId)]);
          }
        }
        if (toParams.deleteUserId) {
          vm.dom.users.splice(helpersService.getIndexInArray(vm.dom.users, '_id', toParams.deleteUserId), 1);
        }
        vm.dom.slider.open = false;
      }
    });

    $scope.$watch('vm.dom.slider.open', function (open) {
      if (angular.isDefined(open) && !open) {
        $state.go('app.base.users.list');
      }
    });

    var init = function () {
      angular.copy(Users, vm.dom.users);
    }

    init();

  };
})();
