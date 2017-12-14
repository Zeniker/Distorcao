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
                movimentacaoBase:2,
                escalamentoArma:[
                    {sigla: '-', valor: 0},
                    {sigla: 'S+', valor: 195},
                    {sigla: 'S', valor: 180},
                    {sigla: 'S-', valor: 165},
                    {sigla: 'A+', valor: 150},
                    {sigla: 'A', valor: 140},
                    {sigla: 'A-', valor: 130},
                    {sigla: 'B+', valor: 120},
                    {sigla: 'B', valor: 110},
                    {sigla: 'B-', valor: 100},
                    {sigla: 'C+', valor: 90},
                    {sigla: 'C', valor: 80},
                    {sigla: 'C-', valor: 70},
                    {sigla: 'D+', valor: 60},
                    {sigla: 'D', valor: 50},
                    {sigla: 'D-', valor: 40},
                    {sigla: 'E+', valor: 30},
                    {sigla: 'E', valor: 15},
                    {sigla: 'E-', valor: 1}
                ]}
                    /*sigla:['-', 'S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-',
                    'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E+', 'E', 'E-'],
             valor:[0, 195, 180, 165, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 15, 1]}*/

        return service;
    }
})();