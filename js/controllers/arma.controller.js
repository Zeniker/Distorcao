angular
.module('distorcao')
.controller('armaController', armaController);

function armaController(calculaBonus, configuracaoPadrao) {
    var vm = this;

    //Configuração padrão
    configuracao = configuracaoPadrao;

    //Funções
    vm.calculaDano = calculaDano;

    //Variáveis
    vm.attForca = 0;
    vm.attDestreza = 0;
    vm.attMental = 0;
    vm.danoBase = 0;
    vm.resultadoDano = 0;
    vm.resultadoDanoBase = 0;
    vm.bonusForca = 0;
    vm.bonusDestreza = 0;
    vm.bonusMental = 0;
    vm.escalamentoArma = configuracao.escalamentoArma;
    vm.escalamentoForca = vm.escalamentoArma[0];
    vm.escalamentoDestreza = vm.escalamentoArma[0];
    vm.escalamentoMental = vm.escalamentoArma[0];
    vm.totalForca = 0;
    vm.totalDestreza = 0;
    vm.totalMental = 0;

    /*
    Calculo de escalamento:
              + TOTAL FORÇA(DANO BASE x ((BONUS FORÇA / 100) x (ESCALAMENTO FORÇA / 100))
    DANO BASE + TOTAL DESTREZA(DANO BASE x ((BONUS DESTREZA / 100) x (ESCALAMENTO DESTREZA / 100))
              + TOTAL MENTAL(DANO BASE x ((BONUS MENTAL / 100) x (ESCALAMENTO MENTAL / 100))
    Exemplo:
    S escalamento de força e 40 atributo de força, com 100 de dano base
    100 + 180(100 x ((100 / 100) x (180 / 100)) + 0 (100 x ((0 / 100) x (0 / 100))) + 0 (100 x ((0 / 100) x (0 / 100)))

    Math.floor(calculaBonus.retornaValorBonus(configuracao.intervaloForca, configuracao.multiplicadorForca, vm.attForca))
    */

    function calculaDano(){
        vm.resultadoDanoBase = vm.danoBase;
        vm.totalForca = vm.danoBase * (calculaBonus.retornaValorBonus(configuracao.intervaloForca, configuracao.multiplicadorForca, vm.attForca) / 100)
                                    * (vm.escalamentoForca.valor / 100);
        vm.totalDestreza = vm.danoBase * (calculaBonus.retornaValorBonus(configuracao.intervaloDestreza, configuracao.multiplicadorDestreza, vm.attDestreza) / 100)
                                    * (vm.escalamentoDestreza.valor / 100);
        vm.totalMental = vm.danoBase * (calculaBonus.retornaValorBonus(configuracao.intervaloMental, configuracao.multiplicadorMental, vm.attMental) / 100)
                                    * (vm.escalamentoMental.valor / 100);
        vm.resultadoDano = Math.floor(vm.danoBase + vm.totalForca + vm.totalDestreza + vm.totalMental);
        vm.bonusForca = calculaBonus.retornaValorBonus(configuracao.intervaloForca, configuracao.multiplicadorForca, vm.attForca);
        vm.bonusDestreza = calculaBonus.retornaValorBonus(configuracao.intervaloDestreza, configuracao.multiplicadorDestreza, vm.attDestreza);
        vm.bonusMental = calculaBonus.retornaValorBonus(configuracao.intervaloMental, configuracao.multiplicadorMental, vm.attMental);
    }

}