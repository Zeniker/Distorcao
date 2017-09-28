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

        var indiceAlterando = -1;
        
        //Funções
        vm.salvaCadastro = salvaCadastro;
        vm.exportaCadastro = exportaCadastro;
        vm.importaJson = importaJson;     
        vm.testeCalculo = testeCalculo;       
        vm.alteraAcao = alteraAcao;    
        vm.novaAcao = novaAcao;
        vm.excluiAcao = excluiAcao;

        //Implementação
        function salvaCadastro(){
            if(indiceAlterando > -1){
                vm.acoes[indiceAlterando].nome = vm.tempNome;
                vm.acoes[indiceAlterando].inicio = vm.tempInicio;
                vm.acoes[indiceAlterando].meio = vm.tempMeio;

                indiceAlterando = -1;
            }else{
                var acao = {
                    nome: vm.tempNome,
                    inicio: vm.tempInicio,
                    meio: vm.tempMeio
                }
    
                vm.acoes.push(acao);
            }            
        }

        function exportaCadastro(){
            exportaJson.eventoExport(angular.toJson(vm.acoes), "acoes.json");
        }

        function importaJson(contents){            
            vm.acoes = angular.fromJson(contents);            
        }

        function alteraAcao(indice){
            indiceAlterando = indice;
            vm.tempNome = vm.acoes[indice].nome;
            vm.tempInicio = vm.acoes[indice].inicio;
            vm.tempMeio = vm.acoes[indice].meio;
        }

        function novaAcao(){
            indiceAlterando = -1;
            vm.tempInicio = "";
            vm.tempMeio = "";
            vm.tempNome = "";
        }

        function excluiAcao(indice){
            vm.acoes.splice(indice);
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

