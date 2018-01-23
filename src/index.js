const puppeteer = require('puppeteer');

module.exports = async (config) => {
  const {
    delay,
    url,
    maxMemoryLimit,
    maxMemoryPercentThreshold,
  } = config || {};

  const browser = await puppeteer.launch({
    slowMo: delay,
    options: {
      args: ['--enable-precise-memory-info']
    }
  });
  const page = await browser.newPage();
  await page.goto(url);

  await page.evaluate(`window.maxMemoryPercentThreshold = ${maxMemoryPercentThreshold}`)
  await page.evaluate(`window.maxMemoryLimit = ${maxMemoryLimit}`)

  const memory = await page.evaluate(() => {
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = window.performance.memory
    const memoryUsagePercent = (window.maxMemoryPercentThreshold / 100) * jsHeapSizeLimit

    return {
      usedJSHeapSize: usedJSHeapSize,
      totalJSHeapSize: totalJSHeapSize,
      jsHeapSizeLimit: jsHeapSizeLimit,
      memoryUsagePercent: memoryUsagePercent,
      timestamp: new Date().toISOString(),

      // Check if we've exceeded absolute memory limit
      exceededMemoryMaximum: usedJSHeapSize - window.maxMemoryLimit,
      // Check if we've exceeded relative memory limit for client
      exceededMemoryUsagePercent: usedJSHeapSize > memoryUsagePercent,
    }
  });

  await browser.close();
  return memory;
};