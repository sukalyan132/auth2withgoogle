var app = angular.module('angular-google-api-example', [
    'ngCookies',
    'ui.router',
    'angular-google-gapi',

    'angular-google-api-example.router',
    'angular-google-api-example.controller'

]);

app.run(['GAuth', 'GApi', 'GData', '$state', '$rootScope', '$window', '$cookies',
    function(GAuth, GApi, GData, $state, $rootScope, $window, $cookies) {

        $rootScope.gdata = GData;

        var CLIENT = '692629459250-4mgaj61c5ovgbqa6b9eij5pqaqtp7sn8.apps.googleusercontent.com';
        var BASE;
        

        BASE = 'https://localhost:3600';

        GApi.load('myContactApi', 'v1', BASE);
        GApi.load('calendar', 'v3');
        GAuth.setClient(CLIENT);
        GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly');
        
        var currentUser = $cookies.get('userId');
        if(currentUser) {
            GData.setUserId(currentUser);
            GAuth.checkAuth().then(
                function () {
                    if($state.includes('login'))
                        $state.go('home');
                },
                function() {
                    $state.go('login');
                }
            );
        } else {
            $state.go('login');
        }



        $rootScope.logout = function() {
            GAuth.logout().then(function () {
                $cookies.remove('userId');
                $state.go('login');
            });
        };
    }
]);
