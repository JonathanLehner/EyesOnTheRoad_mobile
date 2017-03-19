/**
 * Created by jonathan on 18/03/17.
 */

angular.module('myspotify.controllers', [])

// To prevent errors
  .controller('PlaylistCtrl', function($scope, $stateParams, Spotify) {
    var listid = $stateParams.listid;
    var userid = $stateParams.userid;
    $scope.listname = $stateParams.listname;

    $scope.audio = new Audio();

    $scope.tracks = [];

    Spotify.getPlaylist(userid, listid).then(function (data) {
      $scope.tracks = data.tracks.items;
      item = $scope.tracks;
      //alert(item[0]);
      //alert(tracks[0]);
      $scope.playTrack(item[0]);

    });

    $scope.playTrack = function(trackInfo) {
      $scope.audio.src = trackInfo.track.preview_url;
      $scope.audio.play();
    };

    $scope.openSpotify = function(link) {
      window.open(link, '_blank', 'location=yes');
    };

    $scope.stop = function() {
      if ($scope.audio.src) {
        $scope.audio.pause();
      }
    };

    $scope.play = function() {
      if ($scope.audio.src) {
        $scope.audio.play();
      }
    };
  })

  .controller('ListsCtrl', function($scope, $ionicPlatform, $cordovaOauth, Spotify) {
    var clientId = '0fd91ac44a6d412f858cc3041a1efef6';
    $scope.playlists = [];

    $scope.performLogin = function() {//alert("1");
      $cordovaOauth.spotify(clientId, ['user-read-private', 'playlist-read-private']).then(function(result) {//alert("2");
        window.localStorage.setItem('spotify-token', result.access_token);
        Spotify.setAuthToken(result.access_token);
        $scope.updateInfo();
      }, function(error) {
        console.log("Error -> " + error);
      });
    };

    $scope.updateInfo = function() {
      Spotify.getCurrentUser().then(function (data) {
        $scope.getUserPlaylists(data.id);
      }, function(error) {
        $scope.performLogin();
      });
    };

    $ionicPlatform.ready(function() {
      var storedToken = window.localStorage.getItem('spotify-token');
      if (storedToken !== null) {
        Spotify.setAuthToken(storedToken);
        //$scope.updateInfo();
      } else {
        $scope.performLogin();
      }

      //$scope.updateInfo();











    });




    $scope.playTrack = function(trackInfo) {
      $scope.audio.src = trackInfo.track.preview_url;
      $scope.audio.play();
    };

    $scope.openSpotify = function(link) {
      window.open(link, '_blank', 'location=yes');
    };

    $scope.stop = function() {
      if ($scope.audio.src) {
        $scope.audio.pause();
      }
    };

    $scope.play = function() {
      if ($scope.audio.src) {
        $scope.audio.play();
      }
    };



















    $scope.getUserPlaylists = function(userid) {
      Spotify.getUserPlaylists(userid).then(function (data) {
        $scope.playlists = data.items;
        console.log(JSON.stringify($scope.playlists));
        list = $scope.playlists[0];
        console.log(list);
        var listid = list.id;
        var userid = list.owner.id;


        $scope.audio = new Audio();

        $scope.tracks = [];

        Spotify.getPlaylist(userid, listid).then(function (data) {
          $scope.tracks = data.tracks.items;
          item = $scope.tracks;
          if ($scope.audio.src) {
            $scope.audio.pause();
          }
          $scope.playTrack(item[0]);
        });

      })                                                                  ;
    };







    $scope.init = function(){
         //alert("init");

            var brIdentifier = 'estimote';
            var brUuid = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';
            var brMajor = null;
            var brMinor = null;
            var brNotifyEntryStateOnDisplay = true;

            $ionicPlatform.ready(function () {


              cordova.plugins.locationManager.isBluetoothEnabled()
                .then(function (isEnabled) {
                  console.log("isEnabled: " + isEnabled);
                  if (isEnabled) {
                    //cordova.plugins.locationManager.disableBluetooth();
                  } else {
                    cordova.plugins.locationManager.enableBluetooth();
                  }
                })
                .fail(function (e) {
                  console.error(e);
                })
                .done();


              //alert("bluetooth ready");
              /*
               {
               "name": "TI SensorTag",
               "id": "BD922605-1B07-4D55-8D09-B66653E51BBA",
               "rssi": -79,
               "advertising": " ArrayBuffer or map "
              }
               */
              ble.startScan([], function(device) {
                if(device.id == "FC:D6:BD:10:08:E3" && device.name == "EyesOnTheRoad"){
                  //alert("success");
                  $scope.updateInfo();
                }
                console.log(JSON.stringify(device));
                //alert(JSON.stringify(device));
              });


              var logToDom = function (message) {
                var e = document.createElement('label');
                e.innerText = message;

                var br = document.createElement('br');
                var br2 = document.createElement('br');
                document.body.appendChild(e);
                document.body.appendChild(br);
                document.body.appendChild(br2);

                window.scrollTo(0, window.document.height);
              };

              var delegate = new cordova.plugins.locationManager.Delegate();

              delegate.didDetermineStateForRegion = function (pluginResult) {

                logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

                cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                  + JSON.stringify(pluginResult));
              };

              delegate.didStartMonitoringForRegion = function (pluginResult) {
                console.log('didStartMonitoringForRegion:', pluginResult);

                logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
              };

              delegate.didRangeBeaconsInRegion = function (pluginResult) {
                logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
                $scope.updateInfo(); //starts music with timeout 30sec
              };

              var uuid = '00000000-0000-0000-0000-000000000000';
              var identifier = 'beaconOnTheMacBooksShelf';
              var minor = 1000;
              var major = 5;
              var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

              cordova.plugins.locationManager.setDelegate(delegate);

              cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
                .fail(function(e) { console.error(e); })
                .done();










            });



























































































































































































































    }





  });



