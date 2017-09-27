(function(){
    'use strict';

    angular
        .module('distorcao')
        .controller('acaoController', acaoController);

    function acaoController(exportaJson){
        var vm = this;

        //Variáveis        
        vm.acoes = [];
        vm.tempNome = "";
        vm.tempInicio = "";
        vm.tempMeio = "";
        
        //Funções
        vm.salvaCadastro = salvaCadastro;
        vm.exportaCadastro = exportaCadastro;
        vm.importaJson = importaJson;     
        vm.testeCalculo = testeCalculo;           

        function salvaCadastro(){
            var acao = {
                nome: vm.tempNome,
                inicio: vm.tempInicio,
                meio: vm.tempMeio
            }

            vm.acoes.push(acao);            
        }

        function exportaCadastro(){
            exportaJson.eventoExport(angular.toJson(vm.acoes), "acoes.json");
        }

        function importaJson(contents){            
            vm.acoes = angular.fromJson(contents);            
        }

        function testeCalculo(expressao){
            while(expressao.indexOf("init") > -1){
                expressao = expressao.replace("init", "60");
            }            

            console.log(expressao);

            console.log(eval(expressao));
        }


    }


})();

