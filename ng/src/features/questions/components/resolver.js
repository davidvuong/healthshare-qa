import angular from 'angular';

class QuestionResolver {
  constructor() {
    this.$get = this.resolve;

    this.resolve.$inject = ['$q', '$stateParams', 'pagination', 'questions'];
  }

  resolve($q, $stateParams, pagination, questions) {
    const deferred = $q.defer();
    const questionId = $stateParams.questionId;

    // `questionId` does not exist means invalid URL.
    if (!questionId) {
      deferred.reject();
      return deferred.promise;
    }

    // Try to fetch the question from cache if possible.
    const paginator = pagination.get('/api/questions/');
    const resource = paginator.find(questionId);
    if (resource) {
      deferred.resolve(resource);
      return deferred.promise;
    }

    // Fetch the question from the server.
    questions.get(questionId).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  }
}

export default angular.module('provider.resolver.questions', [])
  .provider('questionResolver', QuestionResolver)
  .name;
