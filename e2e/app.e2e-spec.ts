import { KspPage } from './app.po';

describe('ksp App', () => {
  let page: KspPage;

  beforeEach(() => {
    page = new KspPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
