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

  createQuestion(title, description) {
    const deferred = this.$q.defer();

    const payload = { title, description };
    this.request.post('/api/questions/', payload).then((res) => {
      deferred.resolve(res.data);
    }, deferred.reject);
    return deferred.promise;
  }

  createAnswer(questionId, answer) {
    const deferred = this.$q.defer();

    const endpoint = `/api/questions/${questionId}/answers/`;
    const payload  = { description: answer, question: questionId };

    this.request.post(endpoint, payload).then((res) => {
      deferred.resolve(res.data);
    }, deferred.reject);
    return deferred.promise;
  }

  /* Up or down vote an answer (determined by `type`). */
  voteAnswer(questionId, answerId, type) {
    const deferred = this.$q.defer();

    const endpoint = `/api/questions/${questionId}/answers/${answerId}/${type}/`;
    this.request.post(endpoint, {}).then(() => {
      deferred.resolve();
    }, deferred.reject);
    return deferred.promise;
  }
}

export default angular.module('services.questions', [])
  .service('questions', Questions)
  .name;
Questions.$inject = ['$q', 'request'];
