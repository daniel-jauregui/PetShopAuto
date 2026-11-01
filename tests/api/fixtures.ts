import { createBdd, test as base } from 'playwright-bdd';
import type { APIResponse } from '@playwright/test';

type ApiScenario = {
  accessToken: string | undefined;
  productsResponse: APIResponse | undefined;
};

type ApiFixtures = {
  apiScenario: ApiScenario;
};

export const test = base.extend<ApiFixtures>({
  apiScenario: async ({}, use) => {
    await use({
      accessToken: undefined,
      productsResponse: undefined,
    });
  },
});

export const { Given, When, Then } = createBdd(test);
