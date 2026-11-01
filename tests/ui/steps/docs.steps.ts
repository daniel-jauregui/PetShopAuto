import { expect } from '@playwright/test';
import { Given, Then } from '../pages/fixtures.js';

Given('I open the API documentation', async ({ docsPage }) => {
  await docsPage.goTo('/docs');
});

Then('I see the PetShop API title', async ({ docsPage }) => {
  await expect(docsPage.titleLocator).toContainText('PetShop API');
});

Then('I see the Products section', async ({ docsPage }) => {
  await expect(docsPage.productsSectionLocator).toBeVisible();
});
