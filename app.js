TwitchList = angular.module('TwitchList', [])

TwitchList.controller('TwitchCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.streamList = ["ESL_SC2", "OgamingSC2", "freecodecamp"]

	$scope.fullStreams = [];
	$scope.counter = 0;

	$scope.Search = function() {

		$scope.streamList.push($scope.channel);
    $scope.channel = '';

		var title = $scope.streamList[$scope.streamList.length - 1];

		$http({
			url: 'https://api.twitch.tv/kraken/streams/' + $scope.streamList[$scope.streamList.length - 1],
			params: {
				client_id: 'c6qmqpqus0cqyggwn48jb7cudy40uxa'
			}
		}).then(function success(response) {

			var status = '';
      var img = '';

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

      $scope.fullStreams.push(stream);

			console.log('success:', response);
		}, function error(response) {
			console.log('error: ', response);
      // console.log(response.status);
      var stream = {
        streamTitle: title,
        status: 'Not Found!',
        img: 'http://static.petersplugins.com/uploads/2013/09/404page-1000x1000-300x300.png',
        all: 'All'
      }

      // console.log('streamObj: ', stream);
      $scope.fullStreams.push(stream);
		})
	}

	$scope.deleteItem = function(idx){
    $scope.fullStreams.splice(idx, 1);
  }

	$scope.twitchReq = function(){
    if($scope.streamList.length - 1 >= $scope.counter){
       var title = $scope.streamList[$scope.counter];
       // console.log('set: ',title);

      $http({
      	url: 'https://api.twitch.tv/kraken/streams/' + $scope.streamList[$scope.counter],
        params: {
          client_id: 'c6qmqpqus0cqyggwn48jb7cudy40uxa'
        }
      }).then(function success(response){

        // console.log('success: ', res.data);
        // console.log('in http: ', title);
        var status = '';
        var img = '';

        if(response.status === 200){
         
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

          // console.log('streamObj: ', stream);

          $scope.fullStreams.push(stream);
          $scope.counter += 1;
          // console.log($scope.counter);
          $scope.twitchReq();

        } 
      }, function error(response){

        // console.log(res.status);
        var stream = {
          streamTitle: title,
          status: 'Not Found!',
          img: 'http://static.petersplugins.com/uploads/2013/09/404page-1000x1000-300x300.png',
          all: 'All'
        }

        // console.log('streamObj: ', stream);
        $scope.fullStreams.push(stream);

      }); 
    }
  }

  $scope.online = function(){
    $scope.filter = {status: 'Online'};
  }

  $scope.offline = function(){
    $scope.filter = {status: 'Offline'};
  }

  $scope.all = function(){
    $scope.filter = {all: 'All'};
  }

  $scope.twitchReq();
}])