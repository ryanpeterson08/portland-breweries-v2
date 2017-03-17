import { AngularPubsPage } from './app.po';

describe('angular-pubs App', function() {
  let page: AngularPubsPage;

  beforeEach(() => {
    page = new AngularPubsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
