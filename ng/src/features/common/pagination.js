import angular from 'angular';
import config from './config';
import _ from 'lodash';

class PaginationResource {
  constructor($q, request, endpoint) {
    this.$q = $q;
    this.request = request;

    this.hasFetched_m = false;
    this.endpoint_m = endpoint;
    this.data_m = { count: 0, results: [] };
  }

  set data(data) { this.data_m = data; }
  get data()     { return this.data_m; }

  get resources() {
    return this.data.results;
  }
  get length() {
    return this.resources.length;
  }

  _updateData(data) {
    _.each(data.results, (resource) => {
      this.data_m.results.push(resource);
    });
    this.data_m.next = data.next;
    this.data_m.prev = data.prev;
  }

  /* Performs an initial fetch, resetting `data_m`. */
  fetch(force = false) {
    const deferred = this.$q.defer();
    if (this.hasFetched_m && !force) {
      deferred.resolve();
      return deferred.promise;
    }

    this.hasFetched_m = true;
    this.request.get(this.endpoint_m).then((res) => {
      this._updateData(res.data);
      deferred.resolve();
    }, deferred.reject);
    return deferred.promise;
  }

  hasNext() {
    if (!this.data) {
      return false;
    }
    if (this.length === this.data.count) {
      return false;
    }
    return !!this.data.next;
  }

  next() {
    const deferred = this.$q.defer();
    if (!this.hasNext()) {
      deferred.reject();
      return deferred.promise;
    }
    this.request.get(this.data.next).then((res) => {
      this._updateData(res.data);
      deferred.resolve();
    }, deferred.reject);
    return deferred.promise;
  }
}

class Pagination {
  constructor($q, request) {
    this.$q = $q;
    this.request = request;

    this.cache = [];
  }

  _create(endpoint) {
    return new PaginationResource(this.$q, this.request, endpoint);
  }

  /* Retrieves the paginator from the cache, new is created if not exists. */
  get(endpoint) {
    let paginator = this.cache[endpoint];
    if (!paginator) {
      this.cache[endpoint] = this._create(endpoint);
      paginator = this.cache[endpoint];
    }
    return paginator;
  }

  /* Replaces the existing cached paginator, new created regardless of cache. */
  replace(endpoint) {
    this.cache[endpoint] = this._create(endpoint);
    return this.cache[endpoint];
  }

  /* Removes the paginator from cache. */
  remove(endpoint) {
    delete this.cache[endpoint];
  }
}

export default angular.module('services.pagination', [])
  .service('pagination', Pagination)
  .name;
Pagination.$inject = ['$q', 'request'];
