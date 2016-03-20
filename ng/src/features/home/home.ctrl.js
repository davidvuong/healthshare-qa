export default class HomeController {
  constructor($location, authentication, pagination, questions) {
    this.$location = $location;
    this.authentication = authentication;
    this.pagination = pagination;
    this.questions = questions;

    this.isLoadingMore = false;
    this.showQuestionForm = false;

    this.paginator = pagination.get('/api/questions/');
    this.paginator.fetch();
    this.resources = this.paginator.resources;
    this.question = {};

    this.hasNext = this.hasNext.bind(this);
    this.next = this.next.bind(this);
    this.logout = this.logout.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  hasNext() {
    return this.paginator.hasNext();
  }

  next() {
    this.isLoadingMore = true;
    this.paginator.next().finally(() => {
      this.isLoadingMore = false;
    });
  }

  askQuestion() {
    this.showQuestionForm = !this.showQuestionForm;
  }

  submitQuestion() {
    const { title, description } = this.question;
    this.questions.createQuestion(title, description).then((res) => {
      this.$location.path(`/questions/${res.id}`);
    });
  }

  /* Log the user out, refresh page, and delegate redirect. */
  logout() {
    this.authentication.logout();
    location.reload(true);
  }
}
HomeController.$inject = ['$location', 'authentication', 'pagination', 'questions'];
