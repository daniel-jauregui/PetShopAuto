import { randomUUID } from 'node:crypto';
import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures.js';

Given('a registered API user', async ({ request, apiScenario }) => {
  const credentials = {
    username: `playwright-${randomUUID()}`,
    password: 'test-password-123',
  };
  const registration = await request.post('/api/v1/auth/register', {
    data: credentials,
  });
  expect(registration.status()).toBe(201);

  const tokenResponse = await request.post('/api/v1/auth/token', {
    form: credentials,
  });
  expect(tokenResponse).toBeOK();

  const token: { access_token: string } = await tokenResponse.json();
  apiScenario.accessToken = token.access_token;
});

When('I request the products list', async ({ request, apiScenario }) => {
  if (apiScenario.accessToken === undefined) {
    throw new Error('The API user must be authenticated before requesting products.');
  }

  apiScenario.productsResponse = await request.get('/api/v1/products/', {
    headers: {
      Authorization: `Bearer ${apiScenario.accessToken}`,
    },
  });
});

Then('the response is successful and contains products', async ({ apiScenario }) => {
  if (apiScenario.productsResponse === undefined) {
    throw new Error('The products list must be requested before checking the response.');
  }

  expect(apiScenario.productsResponse).toBeOK();
  const body: unknown = await apiScenario.productsResponse.json();
  expect(Array.isArray(body)).toBe(true);

  const [first] = body as unknown[];
  if (first !== undefined) {
    expect(first).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
      stock: expect.any(Number),
      category: expect.any(String),
      pet_type: expect.any(String),
    });
  }
});
