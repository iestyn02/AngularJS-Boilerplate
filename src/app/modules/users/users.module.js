(function () {
  'use strict';

  angular
    .module('axier.app.users', [

    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider) {
    $stateProvider
      .state('app.base.users', {
        url: '/users',
        abstract: true,
        template: '<ui-view></ui-view>'
      })
      .state('app.base.users.list', {
        url: '',
        templateUrl: 'app/modules/users/users.html',
        controller: 'UsersController as vm',
        params: {
          updateId: null,
          deleteUserId: null,
          updateUser: {}
        },
        resolve: {
          Users: function (UsersService) {
            return UsersService.list().then(function (res) {
              return res.data;
            });
          }
        }
      })
      .state('app.base.users.list.details', {
        url: '/:id'
      });

  };
})();
