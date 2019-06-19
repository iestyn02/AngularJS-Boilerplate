(function () {
  'use strict';

  angular
    .module('axier.app.users')
    .factory('UsersService', UsersService);

  /** @ngInject */
  function UsersService($q, $http) {

    /**
     * This is a service module used in order to mimic actual API resource consumption in users.controller.js.
     * For the purpose of the demo a hardcoded json file is loaded and then stringified and stored
     * and maintained using local storage. 
     */

    var users = [];

    var generateGUID = function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    var service = {
      list: function () {
        return $q(function (resolve, reject) {
          if (localStorage.getItem("__users") === null) {
            return $http.get('./assets/data/users.json').then(function (res) {
              angular.copy(res.data, users);
              localStorage.setItem("__users", JSON.stringify(res.data));
              resolve(res);
            });
          } else {
            var get_users_local = JSON.parse(localStorage.getItem("__users"));
            if (angular.isArray(get_users_local)) {
              angular.copy(get_users_local, users);
              resolve({ 'data': users });
            } else {
              alert('Invalid JSON stored in Local Storage');
              reject('Invalid JSON stored in Local Storage');
            }
          }
        });
      },
      get: function (user_id) {
        return $q(function (resolve, reject) {
          if (!user_id) {
            reject({
              status: 400,
              data: {
                message: 'User ID was not provided'
              }
            });
          } else {
            users.forEach(function (val) {
              if (user_id === val._id) {
                resolve(val);
              }
            });
          }
        });
      },
      patch: function (user_id, user) {
        return $q(function (resolve, reject) {
          if (!user_id) {
            reject({
              status: 400,
              data: {
                message: 'User ID was not provided'
              }
            });
          } else {
            users.forEach(function (val, i, _users) {
              if (user_id === val._id) {
                angular.copy(user, _users[i]);
                localStorage.setItem('__users', JSON.stringify(users));
                resolve({
                  data: null,
                  status: 200,
                  statusText: "OK",
                  xhrStatus: "complete"
                });

              }
            })
          }
        })
      },
      delete: function (user_id) {
        return $q(function (resolve, reject) {
          if (!user_id) {
            reject({
              status: 400,
              data: {
                message: 'User ID was not provided'
              }
            });
          } else {
            var del_index = -1;
            for (var i = 0; i < users.length; i++) {
              if (users[i]._id == user_id) {
                del_index = i;
              }
            }
            users.splice(del_index, 1);
            localStorage.setItem('__users', JSON.stringify(users));
            resolve({
              data: null,
              status: 200,
              message: "Deleted User " + user_id,
              xhrStatus: "complete"
            });
          }
        });
      },
      post: function (user) {
        var gen_id = generateGUID();
        return $q(function (resolve, reject) {
          users.unshift(user);
          localStorage.setItem('__users', JSON.stringify(users));
          resolve({
            data: gen_id,
            status: 200,
            message: "New User " + gen_id,
            xhrStatus: "complete"
          });
        });
      }
    }

    return service;

  };
})();
