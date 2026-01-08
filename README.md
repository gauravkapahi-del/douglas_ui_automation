# Doclus Test Suite

This project is a Playwright-based automated test suite for validating filter functionality on the Douglas website across multiple browsers.

## Project Structure

```
douglas_ui_automation/
├── common/              # Shared test utilities and base classes
│   ├── baseTest.ts      # Base test configuration
│   ├── CommonPage.ts    # Common page object methods
│   └── CommonScenario.ts # Reusable test scenarios
├── locators/            # Element locators for each page
│   ├── HomePageLocators.ts
│   ├── NuePageLocators.ts
│   ├── PerfumePageLocators.ts
│   └── SalePageLocators.ts
├── pages/               # Page Object Models
│   ├── HomePage.ts
│   ├── NuePage.ts
│   ├── PerfumePage.ts
│   └── SalePage.ts
├── tests/               # Test specifications
│   └── Douglas_Filters.spec.ts
├── testdata/            # Test data files
│   └── testData.ts
├── utility/             # Utility functions
│   └── logger.ts        # Logging configuration
├── playwright.config.ts # Playwright configuration
├── package.json         # Project dependencies
└── README.md            # This file
```

## Prerequisites

- Node.js v16 or higher
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd douglas_ui_automation
```

2. Install dependencies:

```bash
npm install
```

This installs `@playwright/test`, `playwright`, and `winston`.

## Configuration

`playwright.config.ts` supports multiple browsers: Chromium, Firefox, and WebKit.

### Browser Specifications

| Browser  | Viewport    | Details               |
| -------- | ----------- | --------------------- |
| Chromium | 1920×1080   | Standard desktop      |
| Firefox  | Desktop     | Full emulation        |
| WebKit   | Safari-like | Cross-browser testing |

## Running Tests

```bash
# All browsers
npx playwright test

# Specific browser
npx playwright test --project=chromium

# UI mode (interactive)
npx playwright test --ui

# Debug mode
npx playwright test --debug
```

## Test Results

- **HTML Report**: `playwright-report/index.html`
- **Results**: `test-results/` directory
- **Logs**: `logs/` directory

View results: `npx playwright show-report`

## Test Structure

Tests use Page Object Model with fixtures:

```typescript
test("Test Name", async ({ page, homePage, perfumePage }, testinfo) => {
  await test.step("Step 1", () => {
    /* actions */
  });
});
```

**Available Fixtures**: `page`, `homePage`, `perfumePage`, `nuePage`, `salePage`, `testinfo`

## Key Features

- Filter verification across product pages (Perfume, Nue, Sale)
- 40-second test timeout
- Parallel execution (disabled on CI)
- 2 retries on CI; none locally
- Trace collection on first retry

## Environment Setup

Create `.env`:

```
BASE_URL=https://www.douglas.de
LOG_LEVEL=info
```

## Troubleshooting

| Issue                  | Solution                                        |
| ---------------------- | ----------------------------------------------- |
| Browsers not installed | `npx playwright install`                        |
| Tests failing          | Check `logs/`, use `--debug` or `--headed`      |
| Network issues         | Verify internet access and website availability |

## Best Practices

- Use Page Objects for all interactions
- Break tests into logical steps
- Maintain selectors in locator files
- Centralize test data
- Use logger utility for debugging

## Known Issues

- **Perfume Page Rendering**: The Perfume page displays differently in automated browser windows compared to local browsers. Filter options may not load correctly in automation mode.
