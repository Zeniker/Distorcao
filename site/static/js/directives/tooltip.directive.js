(function (){
    angular
        .module('distorcao')
        .directive('tooltip', tooltip);

    function tooltip(){
        var ddo = {};

        ddo.restrict = 'A';

        ddo.link = function(scope, element, attrs){
            element.on('mouseenter',function(){
                $(element).tooltip('show');
            });

            element.on('mouseleave',function(){
                $(element).tooltip('hide');
            });
        }

        return ddo;
    }
})();