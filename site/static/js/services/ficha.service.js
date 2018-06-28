(function(){

    angular
        .module('distorcao')
        .service('fichaService', fichaService);

    function fichaService($http){
        var service = {
            getFicha: getFicha,
            getFormOptions: getFormOptions,
            sendFormData: sendFormData
        };

        return service;

        function getFicha(id_registro, callback){
            if (id_registro === null || !angular.isNumber(+id_registro)){
                return null
            }else{
                $http({
                    method: 'GET',
                    url: '/ficha/ajax/get_ficha/' + id_registro
                }).then(callback, function errorCallback(response) {
                    console.log(response)
                    return null;
                });
            }
        }

        function getFormOptions(callback){
            $http({
                method: 'GET',
                url: '/calculo/ajax/get_form_options'
            }).then(callback, function errorCallback(response) {
                console.log(response)
                return null;
            });
        }

        function sendFormData(data, url_destino, callback){
            $http({
                method: 'POST',
                data: JSON.stringify(data),
                url: url_destino
            }).then(callback, function errorCallback(response) {
                console.log(response)
                return null;
            });
        }
    }

})();