(function(){

    angular
        .module('distorcao')
        .service('atributoService', atributoService);
    
    function atributoService($http){
        var service = {
            getAtributosSistema: getAtributosSistema
        };
        
        return service;
    
        function getAtributosSistema(sistema_id, callback){
            if (sistema_id === null || !angular.isNumber(+sistema_id)){
                return null
            }else{
                $http({
                    method: 'GET',
                    url: '/atributo/ajax/atributos_sistema/' + sistema_id
                }).then(callback, function errorCallback(response) {
                    console.log(response)
                    return null;
                });
            }            
        }
    }
    
    })();