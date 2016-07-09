(function() {
  'use strict';

  angular
    .module('mealing', [
      'ngResource',
      'ngCookies',
      'ui.router',
    ]).
    config(function($locationProvider, $resourceProvider, $urlRouterProvider, $stateProvider) {
      $locationProvider.hashPrefix('!');

      $resourceProvider.defaults.stripTrailingSlashes = false;

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('dashboard', {
          url: '/',
          templateUrl: 'static/app/templates/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'vm',
          resolve: {
            Meals: function (Meal) {
              return Meal.query().$promise.then(function (response) {
                return response;
              });
            }
          }
        })
        .state('auth', {
          url: '/auth',
          templateUrl: 'static/app/templates/auth.html',
          controller: 'AuthController',
          controllerAs: 'vm'
        })
        .state('signout', {
          url: '/signout',
          controller: 'SignOutController'
        });
    })
    .run(function($rootScope, $http, $window, $state) {
      $http.defaults.xsrfHeaderName = 'X-CSRFToken';
      $http.defaults.xsrfCookieName = 'csrftoken';

      // Ensure authentication
      //$rootScope.$on('$locationChangeSuccess', function() {
      //  if ($window.authRequired) {
      //    $state.go('login');
      //  }
      //});
    });
  
})();