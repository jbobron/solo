angular.module('supperclub', [
  'supperclub.home',
  ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/home', {
      templateUrl: 'home/home.html',
      controller: 'homeController'
    })

   .otherwise({
      redirectTo: '/signin'
    })



   //.run(function 