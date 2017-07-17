import { ExpensyPage } from './app.po';

describe('Expensy App', () => {
  let page: ExpensyPage;

  beforeEach(() => {
    page = new ExpensyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
