const detox = require('detox');
const config = require('../package.json').detox;
const adapter = require('detox/runners/mocha/adapter');


// let testSummary;

before(async () => {
  await detox.init(config);
});

beforeEach(async function () {
  // testSummary = {
  //   title: this.currentTest.title,
  //   fullName: this.currentTest.fullTitle(),
  //   status: 'running',
  // };
  // console.log('this.currentTest',this.currentTest)
  // await detox.beforeEach(testSummary);
  await adapter.beforeEach(this);
  // await device.reloadReactNative();
});

afterEach(async function () {
  await adapter.afterEach(this);
  // await detox.afterEach(testSummary);
});

after(async () => {
  await detox.cleanup();
  await device.uninstallApp('com.umarkets.analyticslite')
});