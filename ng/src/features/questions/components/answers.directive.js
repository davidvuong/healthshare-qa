import './answers.scss';
import angular from 'angular';

function answers() {
  return {
    restrict: 'E',
    scope: { answers: '=' },
    replace: true,
    template: require('./answers.html')
  }
}

export default angular.module('directives.answers', [])
  .directive('answers', answers)
  .name;
