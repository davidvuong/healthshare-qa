import angular from 'angular';

class Questions {
  constructor($q, request) {
    this.$q = $q;
    this.request = request;
  }

  get(id) {
    const deferred = this.$q.defer();
    this.request.get(`/api/questions/${id}/`).then((res) => {
      deferred.resolve(res.data);
    }, deferred.reject);
    return deferred.promise;
  }

  create(questionId, answer) {
    const deferred = this.$q.defer();

    const endpoint = `/api/questions/${questionId}/answers/`;
    const payload  = { description: answer, question: questionId };

    this.request.post(endpoint, payload).then((res) => {
      deferred.resolve(res.data);
    }, deferred.reject);
    return deferred.promise;
  }
}

export default angular.module('services.questions', [])
  .service('questions', Questions)
  .name;
Questions.$inject = ['$q', 'request'];
