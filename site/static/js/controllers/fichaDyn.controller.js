angular
	.module('distorcao')
	.controller('fichaDynController', fichaController);

function fichaController(sistemaService, narracaoService, atributoService, subatributoService, distorcaoService, calculoService, calculaBonus) {
	var vm = this;
	
	//Funções    
    vm.carregaDados = carregaDados;
    vm.changeSistema = changeSistema;    
    vm.alteraValorInicial = alteraValorInicial;
    vm.alteraAtributo = alteraAtributo;

    //Variáveis
    vm.sistema = null;
    vm.narracao = null;
    vm.lista_atributos = null;
    vm.lista_subatributos = null;
    vm.lista_sistemas = null;
    vm.lista_calculos = null;
    vm.valores_iniciais = [];
    vm.valor_atributo = [];
    vm.valor_subatributo = [];    
	
    //Implementação de funções
    function carregaDados(){
        vm.form = {}
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

    function inicializaArrayValores(lista){
        valores = [];

        for(i = 0; i < lista.length; i++){
            valores[i] = 0;
        }

        return valores;
    }

    function getAtributos(){
        if (vm.sistema === undefined){
            vm.lista_atributos = null;
        }else{            
            atributoService.getAtributosSistema(vm.sistema.id, function(response){                
                vm.lista_atributos = response.data;                                                                

                vm.valor_atributo = inicializaArrayValores(vm.lista_atributos);
            });           
        }
    }

    function getSubatributos(){
        if (vm.sistema === undefined){
            vm.lista_subatributos = null;
        }else{            
            subatributoService.getSubatributosSistema(vm.sistema.id, function(response){
                vm.lista_subatributos = response.data;                

                vm.valor_subatributo = inicializaArrayValores(vm.lista_subatributos);
                vm.valores_iniciais = inicializaArrayValores(vm.lista_subatributos);
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
        valor = vm.valor_atributo[index];
        atributoAtual = vm.lista_atributos[index];

        for(i in vm.lista_calculos){
            if(vm.lista_calculos[i].fk_id_atributo == atributoAtual.id){                
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

        valorTotal = Number(valorInicial);
                
        for(i in vm.lista_calculos){                        
            calculoAtual = vm.lista_calculos[i];
            if(calculoAtual.fk_id_subatributo != subatributo_id){
                continue;
            }            

            valorAtributo = null;
            for(j = 0; j < vm.lista_atributos.length; j++){                
                if(vm.lista_atributos[j].id == calculoAtual.fk_id_atributo){
                    valorAtributo = vm.valor_atributo[j];                    
                }
            }            
            
            valorTotal += calculaBonus.retornaValorBonusString(calculoAtual.intervalo_calculo, calculoAtual.multiplicador_calculo, valorAtributo);
        }

        if([2,4].indexOf(subAtributo.tipo_subatributo) > -1) {
            valorTotal = Math.floor(valorTotal);
        }

        vm.valor_subatributo[indiceValorSubatributo] = valorTotal;
    }

    function alteraValorInicial(indice){        
        recalculaSubatributo(vm.lista_subatributos[indice].id);
    }

}
