import './answers.scss';
import angular from 'angular';
import questions from './questions.service';

function answers(questions) {
  return {
    restrict: 'E',
    scope: { answers: '=' },
    replace: true,
    template: require('./answers.html'),
    link: (scope) => {
      scope.vote = (answer, type) => {
        questions.voteAnswer(answer.question, answer.id, type);
        answer.score += type === 'up' ? 1 : -1;
        answer.has_voted = true;
      };
    }
  }
}

export default angular.module('directives.answers', [questions])
  .directive('answers', answers)
  .name;
