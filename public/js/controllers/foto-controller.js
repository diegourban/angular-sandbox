angular.module('alurapic').controller('FotoController', function($scope, $routeParams, recursoFoto) {
	
	$scope.foto = {};
	$scope.mensagem = "";

	if($routeParams.fotoId) {
		recursoFoto.get({fotoId : $routeParams.fotoId}, function(foto) {
			$scope.foto = foto;
		}, function(err) {
			console.log(err);
			$scope.mensagem = "Não foi possível obter a foto";
		})
	}

	$scope.submeter = function() {
		if($scope.formulario.$valid) {
			if($scope.foto._id) {
				recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function() {
					$scope.mensagem = 'Foto alterada com sucesso';
				}, function(err) {
					console.log(err);
					$scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
				});
			} else {
				recursoFoto.save($scope.foto, function() {
					$scope.foto = {};
					$scope.mensagem = 'Foto incluida com sucesso';
				}, function(err){
					console.log(err);
					$scope.mensagem = 'Não foi possível incluir a foto';
				});
			}
		}
	}
});