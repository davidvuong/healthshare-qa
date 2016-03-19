import './home.scss';
import angular from 'angular';
import routing from './home.routes';
import HomeController from './home.ctrl';

import questions from './components/questions.directive';

export default angular.module('app.home', [questions])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
