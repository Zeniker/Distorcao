angular
    .module('distorcao')
    .controller('AtributoController', AtributoController);

function AtributoController() {
    var vm = this;

    //Funções
    vm.tipoAtributoChange = tipoAtributoChange;
    vm.carregaAtributo = carregaAtributo;


    //Variáveis
    vm.mostrarLimites = false;
    vm.tipoAtributo = 1;

    //Implementação de funções
    function tipoAtributoChange(){
        console.log('teste');
        if(vm.tipoAtributo != 1){
            vm.mostrarLimites = true;
        }else{
            vm.mostrarLimites = false;
        }

    }

    function carregaAtributo(tipoAtributo){
        //vm.tipoAtributo = tipoAtributo;
        //tipoAtributoChange();
    }


}
