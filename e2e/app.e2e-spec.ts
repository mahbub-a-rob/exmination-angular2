import { ExaminationWebUIPage } from './app.po';

describe('examination-web-ui App', function() {
  let page: ExaminationWebUIPage;

  beforeEach(() => {
    page = new ExaminationWebUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
