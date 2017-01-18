angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams) {
	
	$scope.foto = {};
	$scope.mensagem = "";

	if($routeParams.fotoId) {
		$http.get('v1/fotos/' + $routeParams.fotoId)
		.success(function(foto) {
			$scope.foto = foto;
		})
		.error(function(err) {
			console.log(err);
			$scope.mensagem = "Não foi possível obter a foto";
		});
	}

	$scope.submeter = function() {
		if($scope.formulario.$valid) {
			if($scope.foto._id) {
				$http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
				.success(function() {
					$scope.foto = {};
					$scope.mensagem = 'Foto alterada com sucesso';
				})
				.error(function(err) {
					$scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
					console.log(err);
				});
			} else {
				$http.post('v1/fotos', $scope.foto)
				.success(function() {
					$scope.foto = {};
					$scope.mensagem = 'Foto incluida com sucesso';
				})
				.error(function(err) {
					$scope.mensagem = 'Não foi possível incluir a foto';
					console.log(err);
				});
			}
		}
	}
});