export default class QuestionsController {
  constructor($location, pagination, questions, question) {
    if (!question) { return $location.path('/'); }
    this.questions = questions;
    this.question = question;

    this.paginator = pagination.replace(`/api/questions/${question.id}/answers/`);
    this.answers = this.paginator.resources;
    this.paginator.fetch();
    this.answer = null;

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  submitAnswer() {
    this.questions.create(this.question.id, this.answer).then((res) => {
      this.paginator.prepend(res);
      this.answer = null;
    });
  }
}
QuestionsController.$inject = ['$location', 'pagination', 'questions', 'question'];
