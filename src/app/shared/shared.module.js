(function () {
    'use strict';

    angular
        .module('axier.shared', [
            'axier.shared.directives',
            'axier.shared.factories',
            'axier.shared.services'
        ])
        .config(config);

    /** @ngInject */
    function config() {

    }
})();
