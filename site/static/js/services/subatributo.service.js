(function(){

    angular
        .module('distorcao')
        .service('subatributoService', subatributoService);
    
    function subatributoService($http){
        var service = {
            getSubatributosSistema: getSubatributosSistema
        };
        
        return service;
    
        function getSubatributosSistema(sistema_id, callback){
            if (sistema_id === null || !angular.isNumber(+sistema_id)){
                return null
            }else{
                $http({
                    method: 'GET',
                    url: '/subatributo/ajax/subatributos_sistema/' + sistema_id
                }).then(callback, function errorCallback(response) {
                    console.log(response)
                    return null;
                });
            }            
        }
    }
    
    })();