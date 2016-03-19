export default class LoginController {
  constructor($location, authentication) {
    this.$location = $location;
    this.authentication = authentication;

    this.status = 'idle';
    this.authorize = this.authorize.bind(this);
  }

  authorize() {
    this.status = 'authenticating';
    this.authentication.authorize(this.email, this.password).then(() => {
      this.status = 'success';
      this.$location.path('/home');
    }, (err) => {
      this.status = 'failed';
      console.log(err);
    });
  }
}
LoginController.$inject = ['$location', 'authentication'];
