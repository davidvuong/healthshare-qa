import './questions.scss';
import angular from 'angular';

function questions() {
  return {
    restrict: 'E',
    scope: { questions: '=' },
    replace: true,
    template: require('./questions.html')
  }
}

export default angular.module('directives.questions', [])
  .directive('questions', questions)
  .name;
