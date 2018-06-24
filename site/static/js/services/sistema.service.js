(function(){

    angular
        .module('distorcao')
        .service('sistemaService', sistemaService);
    
    function sistemaService($http){
        var service = {
            getSistemas: getSistemas
        };
        
        return service;
    
        //Não implementado no back-end
        function getSistemas(callback){            
            $http({
                method: 'GET',
                url: '/sistema/ajax/get_lista_sistema'
            }).then(callback, function errorCallback(response) {
                console.log(response)
                return null;
            });                    
        }
    }
    
    })();