(function (){    
    angular
        .module('distorcao')
        .directive('ngJsonSelect', ngJsonSelect);
    
    function ngJsonSelect($parse){
        var ddo = {};

        ddo.restrict = 'A';

        ddo.link = function(scope, element, attrs){
            element.bind('change', function(e) {
                var onFileReadFn = $parse(attrs.ngJsonSelect);
                var reader = new FileReader();
                reader.onload = function() {
                    var fileContents = reader.result;
                    
                    scope.$apply(function() {                        
                        onFileReadFn(scope, {
                            'contents' : fileContents
                        });                        
                    });
                };
                reader.readAsText(element[0].files[0]);
            });
        }

        return ddo;
    }
})();