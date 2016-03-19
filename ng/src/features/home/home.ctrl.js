export default class HomeController {
  constructor(authentication, pagination) {
    this.authentication = authentication;
    this.pagination = pagination;
    this.name = 'Home';

    this.paginator = pagination.get('/api/questions/');
    this.paginator.fetch();
    this.questions = this.paginator.resources;

    this.hasMore = this.hasMore.bind(this);
    this.next = this.next.bind(this);
    this.logout = this.logout.bind(this);
  }

  hasMore() {
    return this.paginator.hasNext();
  }

  next() {
    return this.paginator.next();
  }

  /* Log the user out, refresh page, and delegate redirect. */
  logout() {
    this.authentication.logout();
    location.reload(true);
  }
}
HomeController.$inject = ['authentication', 'pagination'];
