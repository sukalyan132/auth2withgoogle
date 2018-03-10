var controller = angular.module('angular-google-api-example.controller.login', []);

controller.controller('angular-google-api-example.controller.login', ['$scope', 'GAuth', 'GData', '$state', '$cookies',
    function clientList($scope, GAuth, GData, $state, $cookies) {
    	if(GData.isLogin()){
    		$state.go('home');
    	}

        var ifLogin = function() {
            console.log(GData.getUserId());
            $cookies.put('userId', GData.getUserId());
            $state.go('home');
        };

        $scope.doLogin = function() {
               GAuth.checkAuth().then(
                    function () {
                        ifLogin();
                    },
                    function() {
                        GAuth.login().then(function(){
                            ifLogin();
                        });
                    }
                );
                /*
                GAuth.login().then(function(user) {
                console.log(GData.getUser());
                //$state.go('webapp.home'); // action after the user have validated that
                                          // your application can access their Google account
            }, function() {
                console.log('login failed');
            });*/

        };
    }
])