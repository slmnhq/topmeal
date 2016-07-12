(function() {
  'use strict';

  angular
    .module('mealing')
    .controller('AuthController', AuthController);

    function AuthController($scope, $cookies, $state, Auth, User) {
      var vm = this;
      vm.signup = {};
      vm.signin = {};
      vm.SignUp = SignUp;
      vm.SignIn = SignIn;
      
      function SignUp() {
        if (!vm.signup.password || !vm.signup.password_confirm || 
             vm.signup.password != vm.signup.password_confirm) {
          return;
        }
        var auth = new User({
          'username': vm.signup.username,
          'password': vm.signup.password
        });
        auth.$save()
        .then(function() {
          console.log("signed up");
        });
      }
      
      function SignIn() {
        var auth = new Auth({
          'username': vm.signin.username,
          'password': vm.signin.password
        });
        auth.$save()
        .then(function(data) {
          console.log("signed in")
          $cookies.put('profile', data.id);
          $state.go('dashboard');
        });
      }
    }

})();