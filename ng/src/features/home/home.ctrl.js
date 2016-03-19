export default class HomeController {
  constructor(authentication, pagination) {
    this.authentication = authentication;
    this.pagination = pagination;
    this.isLoadingMore = false;

    this.paginator = pagination.get('/api/questions/');
    this.paginator.fetch();
    this.questions = this.paginator.resources;

    this.hasNext = this.hasNext.bind(this);
    this.next = this.next.bind(this);
    this.logout = this.logout.bind(this);
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

  /* Log the user out, refresh page, and delegate redirect. */
  logout() {
    this.authentication.logout();
    location.reload(true);
  }
}
HomeController.$inject = ['authentication', 'pagination'];
