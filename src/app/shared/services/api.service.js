
(function () {
  'use strict';

  angular
    .module('axier.shared.services')
    .factory('APIService', APIService);

  /** @ngInject */
  function APIService($resource, APP_URI_CONFIG) {

    var service = {};

    // var data = $resource(APP_URI_CONFIG + '/mifid-ii/:route/:id/:itemId/:item/:id2/:itemId2', {
    //   route: '@route',
    //   id: '@id',
    //   itemId: '@itemId',
    //   item: '@item',
    //   id2: '@id2',
    //   itemId2: '@itemId2'
    // },
    //   {
    //     'get': { method: 'GET', headers: headers },
    //     'save': { method: 'POST', headers: headers },
    //     'query': { method: 'GET', isArray: true, headers: headers },
    //     'update': { method: 'PUT', headers: headers },
    //     'delete': { method: 'DELETE', headers: headers }
    //   }
    // );

    return service;
  };
})();
