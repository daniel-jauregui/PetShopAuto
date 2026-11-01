import { createBdd, test as base } from 'playwright-bdd';
import { FactoryPage } from './pageFactory.js';
import type { DocsPage } from './docs/docsPage.js';

type PageFixtures = {
  docsPage: DocsPage;
};

export const test = base.extend<PageFixtures>({
  docsPage: async ({ page }, use) => {
    const docsPage = new FactoryPage().createPage('docs', page);
    await use(docsPage);
  },
});

export const { Given, When, Then } = createBdd(test);
