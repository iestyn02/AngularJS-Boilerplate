(function () {
  'use strict';

  angular
    .module('axier')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        abstract: true,
        template: '<ui-view></ui-view>',
        url: '',
        resolve: {
          sessionInfo: function (authService) {
            return authService.checkSession().then(function (res) {
              authService.setSession(res);
              return res;
            })
          }
        }
      })
      .state('callback', {
        url: '/callback',
        controller: function ($state, $timeout, angularAuth0, authService) {
          angularAuth0.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
              authService.setSession(authResult)
              $state.go('app.base.dock');
            } else if (err) {
              $timeout(function () {
                $state.go('app.base.dock');
              });
              alert('Error: ' + err.error + '. Check the console for further details.');
            }
          });
        },
      })
      .state('app.base', {
        abstract: true,
        url: '',
        templateUrl: 'app/shared/tpls/app.html',
        controller: 'AppController as vm',
        resolve: {
          appTpls: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('axier.app'); // Resolve promise and load before view 
          }],
          UserProfile: ['angularAuth0', 'profileProvider', '$log', function (angularAuth0, profileProvider, $log) {
            return angularAuth0.client.userInfo(localStorage.getItem('access_token'), function (err, profile) {
              if (profile) {
                $log.info(profile);
                profileProvider.setProfile(profile);
              } else {
                $log.error(err);
              }
            });
          }]
        }
      })
      .state('app.base.dock', {
        url: '/',
        templateUrl: 'app/shared/tpls/home.html',
        controller: function () {

        }
      });
  }
})();
