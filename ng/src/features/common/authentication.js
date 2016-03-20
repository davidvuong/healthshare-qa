import angular from 'angular';
import config from './config';

class Authentication {
  constructor($q, request) {
    this.$q = $q;
    this.request = request;

    this.current_m = null;
    this.token_m = localStorage.getItem(config.AUTH_KEY);
  }

  get current() {
    return this.current_m;
  }

  hasAuthorized() {
    return !!this.current_m;
  }

  isAuthorized() {
    return !!this.token_m;
  }

  _authorize(email, password) {
    const deferred = this.$q.defer();
    if (this.hasAuthorized()) {
      deferred.resolve(this.current_m);
      return deferred.promise;
    }

    const endpoint = '/api/auth/authenticate/';
    const payload = {};
    if (email)    { payload.email = email; }
    if (password) { payload.password = password; }

    this.request.post(endpoint, payload).then((res) => {
      this.current_m = res.data.user;
      this.token_m = res.data.token;

      localStorage.setItem(config.AUTH_KEY, this.token_m);
      deferred.resolve(this.current_m);
    }, deferred.reject);
    return deferred.promise;
  }

  /* Makes a HTTP request to authorize with email/password. */
  authorize(email, password) {
    const deferred = this.$q.defer();
    if (!email || !password) {
      deferred.reject();
      return deferred.promise;
    }
    return this._authorize(email, password);
  }

  /* Makes a HTTP request to authorize the user with just the token. */
  authorizeWithToken() {
    return this._authorize();
  }

  logout() {
    if (!this.isAuthorized()) { return; }

    localStorage.removeItem(config.AUTH_KEY);
    this.current_m = null;
    this.token_m = null;
  }
}

export default angular.module('services.auth', [])
  .service('authentication', Authentication)
  .name;
Authentication.$inject = ['$q', 'request'];
