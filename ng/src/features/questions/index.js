import './questions.scss';
import angular from 'angular';
import routing from './questions.routes';
import QuestionsController from './questions.ctrl';

import resolver from './components/resolver';
import questions from './components/questions.service';
import answers from './components/answers.directive';

export default angular.module('app.questions', [resolver, questions, answers])
  .config(routing)
  .controller('QuestionsController', QuestionsController)
  .name;
