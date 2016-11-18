TwitchList = angular.module('TwitchList', [])

TwitchList.controller('TwitchCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.Search = function() {
		$http({
			url: 'https://api.twitch.tv/kraken/streams/',
			params: {
				client_id: 'c6qmqpqus0cqyggwn48jb7cudy40uxa'
			}
		}).then(function success(response) {
			$scope.res = response;
			console.log('success:', response);
		}, function error(response) {
			console.log('error:', response);
		})
	}


}])