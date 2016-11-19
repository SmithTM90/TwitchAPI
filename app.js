TwitchList = angular.module('TwitchList', [])

TwitchList.controller('TwitchCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.streamList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

	$scope.Search = function() {

		$scope.streamList.push($scope.channel);
    // $scope.channel = '';

		var title = $scope.streamList[$scope.streamList.length - 1];

		$http({
			url: 'https://api.twitch.tv/kraken/streams/' + $scope.channel,
			params: {
				client_id: 'c6qmqpqus0cqyggwn48jb7cudy40uxa'
			}
		}).then(function success(response) {
			// $scope.res = response.data.stream;

			if(response.data.stream === null){
        status = 'Offline';
        img = 'https://static-cdn.jtvnw.net/jtv_user_pictures/ratedmgl-profile_image-265b33ec1dc201e4-300x300.png'
      } else {
        status = 'Online';
        img = response.data.stream.channel.logo;
      }
      var stream = {
        streamTitle: title,
        status: status,
        data: response.data,
        img: img,
        all: 'All'
      }

      console.log('streamObj: ', stream);

      // $scope.streamList.push(stream);

			// var resObj = {
			// 	title: $scope.res.channel.display_name
			// }

			// $scope.streamList.push(resObj.title);

			console.log('success:', response);
		}, function error(response) {
			console.log('error:', response);
		})
	}


}])