(function(){
    
angular
    .module('distorcao')
    .service('configuracaoPadrao', configuracaoPadrao);

    function configuracaoPadrao(){
        var service = {
                nomeConfiguracao:"Padrão",
                vidaBase:400,
                pesoBase:40,
                vidaPorNivel:5,
                vidaPorDeterminacao:5,
                intervaloVigor:[15, 25, 40],
                multiplicadorVigor:[15, 20, 15, 10],
                intervaloPesoDeterminacao:[20, 40],
                multiplicadorPesoDeterminacao:[1.5, 1.25, 1],
                intervaloPesoForca:[40],
                multiplicadorPesoForca:[0.3, 0.1],
                intervaloForca:[40],
                multiplicadorForca:[2.5, 1],
                intervaloDestreza:[40],
                multiplicadorDestreza:[2.5, 1],
                intervaloMental:[10, 30, 50, 65],
                multiplicadorMental:[1, 2.5, 3, 2.5, 1.5],
                movimentacaoBase:2
            }
    
        return service;
    }
})();