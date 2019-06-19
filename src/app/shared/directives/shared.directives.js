(function() {
    'use strict';

    angular
        .module('axier.shared.directives', [])
        .run(function() {
            //run block for directives
        }).

    directive('exampleDirective', function() {
        return {
            restrict: 'E',
            template: '<h1>This is a Directive!</h1>',
            link: function(scope, el) {

            }
        }
    });
})();
