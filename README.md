# pet-shop-auto

Small Playwright + TypeScript BDD project with API and UI tests against the
[PetShop](https://github.com/jirateamadj/PetShop) FastAPI app.

## Setup

1. Start the SUT (from a PetShop checkout, after `pip install -r requirements.txt`):
   `python -m uvicorn app.main:app --port 8000`
2. `cp .env.example .env`
3. `npm install`
4. `npx playwright install chromium`
5. `npm test`

Other scripts: `npm run bddgen` (generate tests), `npm run typecheck`, and `npm run report`.

Note: the UI test opens Swagger UI (`/docs`), which loads its assets from a CDN, so it needs internet access.

Scenarios are written in Gherkin under `tests/api` and `tests/ui`; step definitions use Playwright-BDD's Cucumber-compatible expressions and Playwright fixtures. `npm test` generates the Playwright tests before running them.

The API scenario registers a uniquely named test user, obtains an access token, and verifies the authenticated products list endpoint.
