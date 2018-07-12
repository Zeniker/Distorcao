(function (){
    angular
        .module('distorcao')
        .directive('numberInput', numberInput);

    function numberInput(){
        var ddo = {};

        ddo.require = 'ngModel';
        ddo.restrict = 'A';
        ddo.scope = {
            numberInput: '='
        };

        ddo.link = function($scope, element, attrs, ngModelCtrl){
            function fromUser(text) {
                if (text) {
                    if([2,4].indexOf($scope.numberInput) >  -1){
                        var transformedInput = text.replace(/[^\d+]/g, '');
                    }else if([3,5].indexOf($scope.numberInput) >  -1){
                        var transformedInput = text.replace(/[^\d+(\.\d{1,2})?]/g, '');
                    }

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }

                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        };

        return ddo;
    }
})();