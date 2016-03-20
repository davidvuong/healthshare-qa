export default function routes($stateProvider, resolverProvider, questionResolverProvider) {
  $stateProvider
    .state('questions', {
      url: '/questions/:questionId',
      template: require('./questions.html'),
      controller: 'QuestionsController',
      controllerAs: 'questions',
      resolve: { __: resolverProvider.$get, question: questionResolverProvider.$get }
    });
}
routes.$inject = ['$stateProvider', 'resolverProvider', 'questionResolverProvider'];
