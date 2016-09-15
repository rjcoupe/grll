import { GrllPage } from './app.po';

describe('grll App', function() {
  let page: GrllPage;

  beforeEach(() => {
    page = new GrllPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
