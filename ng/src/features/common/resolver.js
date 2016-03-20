import angular from 'angular';

class Resolver {
  constructor() {
    this.$get = this.resolve;

    this.resolve.$inject = ['$q', 'authentication'];
  }

  resolve($q, authentication) {
    const deferred = $q.defer();

    // Try authenticating with token to retrieve the user object.
    if (authentication.isAuthorized()) {
      const promise = authentication.authorizeWithToken();
      promise.then(deferred.resolve, deferred.reject);
    } else {
      // Accessing a page without authentication.
      deferred.reject();
    }
    return deferred.promise;
  }
}

export default angular.module('provider.resolver', [])
  .provider('resolver', Resolver)
  .name;
