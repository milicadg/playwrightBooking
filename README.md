# PlaywrightExample



## Getting started

## Install playwright
```
npm install --save-dev playwright
npm init playwright@latest
```

## Write tests

Tests and configuration of the project are written in type script. To be able to write tests on this way, it is needed to install typescript:

```
npm install -g typescript
```

## Execute tests
In order to execute tests in non headed mode, execute next command in terminal:
```
npx playwright test --headed
```

## Reporters
Playwright supports next reporters:

- Dot Reporter
- Line Reporter
- JUnit Reporter
- JSON Reporter
- List Reporter

The playwright doesn’t support HTML report by default, but it supports JUnit XML files. 
However, using JUnit reporter and third-party npm packages such as XUnit Viewer we can generate the HTML reporter.

In order to use more modern Allure reporter, it is needed to install reporter and execute next commands to open it:

```
npm i -D allure-commandline
npx playwright test --reporter=line,experimental-allure-playwright
npx allure generate ./allure-results --clean
npx allure open ./allure-report
```