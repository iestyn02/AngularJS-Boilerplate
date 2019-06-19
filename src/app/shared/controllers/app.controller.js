(function() {
  'use strict';

  angular
    .module('axier')
    .controller('AppController', AppController);

  function AppController($window, $rootScope) {

    // $scope.$on('ocLazyLoad.moduleLoaded', function(e, module) {
    //   console.log('module name : ', module);
    // });
    
    // $window.location.reload();

    $rootScope.appConfigs = {
      "searchOpen": false
    };

    angular.module('axier.app').requires.push('ngAnimate');

  };
})();
