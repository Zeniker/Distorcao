var distorcao = angular
					.module('distorcao', []);
distorcao.config(function($httpProvider, $interpolateProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});