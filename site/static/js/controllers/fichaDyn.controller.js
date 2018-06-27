angular
	.module('distorcao')
	.controller('fichaDynController', fichaController);

function fichaController(sistemaService, narracaoService, atributoService, subatributoService, distorcaoService,
                         calculoService, calculaBonus, fichaService, $window) {
	var vm = this;
	
	//Funções    
    vm.carregaDados = carregaDados;
    vm.changeSistema = changeSistema;    
    vm.alteraValorInicial = alteraValorInicial;
    vm.alteraAtributo = alteraAtributo;
    vm.sendFormData = sendFormData;

    //Variáveis
    vm.sistema = null;
    vm.narracao = null;
    vm.lista_atributos = null;
    vm.lista_subatributos = null;
    vm.lista_sistemas = null;
    vm.lista_calculos = null;
    vm.valores_iniciais = [];
    vm.ficha_atributo = [];
    vm.ficha_subatributo = [];
	
    //Implementação de funções
    function carregaDados(destino){
        vm.destino = destino;
        vm.form = {};
        vm.form.id = null;
        vm.form.nome_ficha = null;
        vm.form.fk_id_narracao = null;
        sistemaService.getSistemas(carregaSistemas);
    }

    function carregaSistemas(response){
        vm.lista_sistemas = response.data;
    }

    function changeSistema(){   
        getNarracoes();     
        getAtributos();
        getSubatributos();
        getCalculos();
    }

    function getNarracoes(narracaoPadrao = null){
        if (vm.sistema === undefined){
            vm.lista_narracoes = null;
        }else{            
            narracaoService.getNarracoesSistema(vm.sistema.id, function(response){
                vm.lista_narracoes = response.data;
                
                if(narracaoPadrao !== null){
                    vm.form.fk_id_narracao = distorcaoService.findObjectById(vm.lista_atributos, narracaoPadrao);
                }else{
                    if(vm.lista_narracoes.length > 0){
                        vm.form.fk_id_narracao= vm.lista_narracoes[0];
                    }                          
                }                
            });            
        }
    }

    function inicializaArrayValores(lista, tipo){
        valores = [];

        for(i = 0; i < lista.length; i++){
            valores[i] = {};
            valores[i].fk_id_ficha = 0;
            switch (tipo){
                case 1:
                    valores[i].fk_id_atributo = lista[i].id;
                    valores[i].valor_atributo = 0;
                    break;
                case 2:
                    valores[i].fk_id_subatributo = lista[i].id;
                    valores[i].valor_subatributo = 0;
                    break;
                default:
                    break;
            }

        }

        return valores;
    }

    function getAtributos(){
        if (vm.sistema === undefined){
            vm.lista_atributos = null;
        }else{            
            atributoService.getAtributosSistema(vm.sistema.id, function(response){                
                vm.lista_atributos = response.data;                                                                

                vm.ficha_atributo = inicializaArrayValores(vm.lista_atributos, 1);
            });           
        }
    }

    function getSubatributos(){
        if (vm.sistema === undefined){
            vm.lista_subatributos = null;
        }else{            
            subatributoService.getSubatributosSistema(vm.sistema.id, function(response){
                vm.lista_subatributos = response.data;                

                vm.ficha_subatributo = inicializaArrayValores(vm.lista_subatributos);
                //vm.valores_iniciais = inicializaArrayValores(vm.lista_subatributos);
            });            
        }
    }

    function getCalculos(){
        if (vm.sistema === undefined){
            vm.lista_calculos = null;
        }else{            
            calculoService.getCalculoSistema(vm.sistema.id, function(response){
                vm.lista_calculos = response.data;                        
            });            
        }
    }

    function alteraAtributo(index){
        valor = vm.ficha_atributo[index].valor_atributo;
        atributoAtual = vm.ficha_atributo[index].fk_id_atributo;

        for(i in vm.lista_calculos){
            if(vm.lista_calculos[i].fk_id_atributo == atributoAtual){
                recalculaSubatributo(vm.lista_calculos[i].fk_id_subatributo);                
            }            
        }        
    }

    function recalculaSubatributo(subatributo_id){            
        valorInicial = 0.0;        
        indiceValorSubatributo = 0;
        subAtributo = null;
        for(i in vm.lista_subatributos){            
            if(vm.lista_subatributos[i].id == subatributo_id){                
                valorInicial = vm.valores_iniciais[i];
                indiceValorSubatributo = i;
                subAtributo = vm.lista_subatributos[i];
                break;
            }
        }

        if(valorInicial != undefined && angular.isNumber(+valorInicial)){
            valorTotal = Number(valorInicial);
        }else{
            valorTotal = 0;
        }

                
        for(i in vm.lista_calculos){                        
            calculoAtual = vm.lista_calculos[i];
            if(calculoAtual.fk_id_subatributo != subatributo_id){
                continue;
            }            

            valorAtributo = null;
            for(j = 0; j < vm.lista_atributos.length; j++){                
                if(vm.lista_atributos[j].id == calculoAtual.fk_id_atributo){
                    valorAtributo = vm.ficha_atributo[j].valor_atributo;
                }
            }

            if(calculoAtual.tipo_calculo == 1){

                valorTotal += calculaBonus.retornaValorBonusString(calculoAtual.intervalo_calculo, calculoAtual.multiplicador_calculo, valorAtributo);
            }else{
                valorTotal += (valorAtributo * (calculoAtual.percentual_calculo / 100));
            }

        }

        if([2,4].indexOf(subAtributo.tipo_subatributo) > -1) {
            valorTotal = Math.floor(valorTotal);
        }

        vm.ficha_subatributo[indiceValorSubatributo].valor_subatributo = valorTotal;
    }

    function alteraValorInicial(indice){
        console.log(vm.lista_subatributos[indice]);
        recalculaSubatributo(vm.lista_subatributos[indice].id);
    }

    function sendFormData(){
        formData = distorcaoService.gambiarraNgOptions(vm.form);

        fichaService.sendFormData(formData, vm.destino, sendAtributoData);
    }

    function sendAtributoData(response){
        if(response.data.status == 'OK'){
            vm.form.id = response.data.data;
            defineFkIdFicha_Atributo();
            fichaService.sendAtributoData(vm.ficha_atributo);
        }else{
            return;
        }
    }

    function defineFkIdFicha_Atributo(){
        for(i in vm.ficha_atributo){
            vm.ficha_atributo[i].fk_id_ficha = vm.form.id;
        }
    }

}
