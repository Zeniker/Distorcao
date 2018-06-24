(function(){

    angular
        .module('distorcao')
        .service('narracaoService', narracaoService);
    
    function narracaoService($http){
        var service = {
            getNarracoesSistema: getNarracoesSistema
        };
        
        return service;
    
        //Não implementado no back-end
        function getNarracoesSistema(sistema_id, callback){            
            $http({
                method: 'GET',
                url: '/narracao/ajax/get_narracao_sistema/' + sistema_id
            }).then(callback, function errorCallback(response) {
                console.log(response)
                return null;
            });                    
        }
    }
    
    })();