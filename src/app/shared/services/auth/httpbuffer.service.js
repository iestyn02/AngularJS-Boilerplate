(function() {
  'use strict';

  angular
    .module('axier')
    .factory('HttpBufferService', HttpBufferService);

  function HttpBufferService($injector) {

    var service = {};
    var $http;

    var buffer = [];
    var doAction = false;


    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }

      function errorCallback(response) {
        deferred.reject(response);
      }
      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }

    service.getItems = function() {
      return buffer;
    };

    service.append = function(config, deferred) {
      buffer.push({
        config: config,
        deferred: deferred
      });
    };

    service.rejectAll = function(reason) {
      if (reason) {
        for (var i = 0; i < buffer.length; ++i) {
          buffer[i].deferred.reject(reason);
        }
      }
      buffer = [];
    };

    service.clean = function() {
      buffer = [];
      doAction = false;
    };


    service.retryAll = function() {
      if (!doAction) {
        doAction = true;
        for (var i = 0; i < buffer.length; ++i) {
          retryHttpRequest(buffer[i].config, buffer[i].deferred);
        }
        service.clean();
      }
    };
    return service;
  }
})();