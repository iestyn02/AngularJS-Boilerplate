
(function() {
  'use strict';

  angular
    .module('axier')
    .factory('AuthInterceptorService', AuthInterceptorService);

  function AuthInterceptorService($q, $injector, $timeout, HttpBufferService, angularAuth0, authService) {

    var d = new Date();
    d.setMonth(d.getMonth() + 1);
    d.toISOString();

    var service = {};

    service.request = function(config) {

      if (config.interceptor) {
        config.ignoreAuthModule = true;
        return config;
      }

      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');

      return config;
    };

    service.responseError = function(rejection) {
      console.info(rejection);
      var notify = $injector.get('Popeye');

      if (!rejection.config.interceptor && rejection.status == 401) {

        var deferred = $q.defer();
        HttpBufferService.append(rejection.config, deferred);

        if (HttpBufferService.getItems().length > 1) {
          return deferred.promise;
        }

        // if (rejection.data.error == 'Unauthorized') {
          // var modal = notify.openModal({
          //   templateUrl: "app/modules/websites/list/add.tpl.html",
          //   controller: function($timeout, cfpLoadingBar) {
          //     $timeout(function() {
          //       cfpLoadingBar.complete()
          //     }, 500);
          //   }
          // });
        // }
        
        if(rejection.data.message === "jwt expired"){
          alert('jwt expired, performing silent authentication');
          angularAuth0.checkSession({}, function(err, res) {
            if (err) {
              alert('Session expired');
              angularAuth0.authorize();
            } else {
              console.info(res);
              authService.setSession(res);
              alert('Session supposedly renewed');
              HttpBufferService.retryAll();
            }
          });
        }
      }
      // 
      //     var deferred = $q.defer();
      //     HttpBufferService.append(rejection.config, deferred);
      // 
      //     if (HttpBufferService.getItems().length > 1) {
      //         return deferred.promise;
      //     }
      // 
      //     var refresh_token = $cookies.get('refresh_token');
      // 
      //     if (refresh_token) {
      //         //console.info('Attempting Refresh Token:', refresh_token);
      //         var tokenService = $injector.get('AuthTokenService');
      //         return tokenService.refreshAccessToken(refresh_token).then(
      //             function (response) {
      //                 if (response.data.access_token) {
      //                     //console.info('New Access Token:', response.data.access_token);
      //                     // Set $cookies with new auth data, loop through buffer and retry all requests.
      //                     localStorage.setItem('access_token', response.data.access_token);
      //                     $cookies.put('refresh_token', response.data.refresh_token, { 'expires': d, 'path': '/' });
      //                     HttpBufferService.retryAll();
      //                     //$rootScope.$broadcast('authentication:authenticated', response.data);
      // 
      //                     return deferred.promise;
      //                 }
      //                     // There was a problem refreshing access token but 200 OK was still returned...
      //                 else {
      //                     console.error('Could not obtain new access token', response);
      //                     localStorage.removeItem('access_token');
      //                     HttpBufferService.clean();
      //                     $cookies.remove('refresh_token', { path: '/' });
      // 
      //                     //TEMP FIX BECAUSE OF XML ERROR ON API END
      //                     console.error('Error obtaining access token (Returned XML), reloading...');
      //                     loaderHandler.toggleLoader(false);
      //                     ssoRedirectService.getSsoLogoutRedirect().func();
      //                     //location.reload();
      //                     //$rootScope.$broadcast('authentication:authenticationRequired', response.data);
      //                     return $q.reject(rejection);
      //                 }
      //             },
      //             function (err) {
      //                 console.error("Error obtaining refresh token", err);
      //                 HttpBufferService.clean();
      //                 //localStorage.remove('access_token');
      //                 $cookies.remove('refresh_token');
      //                 $rootScope.$broadcast('authentication:authenticationRequired', err.data);
      //                 return $q.reject(rejection);
      //             }
      //         );  
      //     }
      //     HttpBufferService.clean();
      // }
      // 
      // else if (!rejection.config.ignoreAuthInterceptor && rejection.status == 500 && !$cookies.get('refresh_token')) {
      //     $rootScope.$broadcast('authentication:authenticationRequired', rejection);
      //     //$state.go('500');
      // }

      // Default behaviour
      return $q.reject('test');
    };

    return service;
  };
})();