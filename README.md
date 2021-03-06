# memory-inspector

<!-- [START badges] -->
[![CircleCI](https://circleci.com/gh/raphamorim/memory-inspector/tree/master.svg?style=svg)](https://circleci.com/gh/raphamorim/memory-inspector/tree/master)
<!-- [END badges] -->

<img src="images/logo.png" height="200" align="right">

> Memory Inspector watches memory usage/behavior of an Web Application.
Currently it runs over Puppeteer, which is an API to control headless Chrome or Chromium over the DevTools Protocol.

#### Installing

```bash
yarn add --dev memory-inspector
```

## Usage

#### Example 1

```js
const memoryInspector = require('memory-inspector')

const config = {
  url: 'http://localhost:3000',
  maxMemoryLimit: 20 * 1048576, // should not pass of 20MB
  maxMemoryPercentThreshold: 90, // should not pass 90% of total memory
}

memoryInspector(config).then((info) => console.log(info))

/*
{ "exceededMemoryMaximum": 1528951424,
  "exceededMemoryUsagePercent": true,
  "jsHeapSizeLimit": "2.19 GB",
  "memoryUsagePercent": 21900000,
  "totalJSHeapSize": "1.53 GB",
  "usedJSHeapSize": "1.53 GB" }
*/

```

#### Example 2

```js
const memoryInspector = require('memory-inspector')

const config = {
  url: 'http://127.0.0.1:8080',
  delay: 300,
  formatted: false, // default is true
  maxMemoryLimit: 20 * 1048576, // should not pass of 20MB
  maxMemoryPercentThreshold: 90, // should not pass 90% of total memory
  waitUntil: ['domContentLoaded'], // wait for browser events
}

memoryInspector(config).then((info) => console.log(info))

/*
{ usedJSHeapSize: 10000000,
  totalJSHeapSize: 11900000,
  jsHeapSizeLimit: 2190000000,
  memoryUsagePercent: 438000000,
  exceededMemoryMaximum: -10971520,
  exceededMemoryUsagePercent: false }
*/

```

## Config

#### url

`<string>` URL to navigate page to. The url should include scheme, e.g. `https://`

#### formatted

`<boolean>` Define if will format bytes into sizes, like: `2190000000` to `2.19 GB`. By default it's `true`.

#### delay

`<number>` Slows down report by the specified amount of milliseconds.

#### maxMemoryLimit

`<number>` Sets maximum memory limit which can be used by application, it will reflect on `exceededMemoryMaximum` report.

#### maxMemoryPercentThreshold

`<number>` Sets maximum memory percent threshold on application, it will reflect on `exceededMemoryUsagePercent` report.

#### waitUntil

`<string|array<string>>` When to consider navigation succeeded. Given an array of event strings, navigation is considered to be successful after all events have been fired.

## Roadmap

- [ ] Iterate report operations by configuration
- [ ] Prediction report
- [ ] Integrate with Jest
- [ ] Write decent tests
- [ ] Allows to specify executable based on Webkit Binaries

## About

A Thanks to [Puppeteer](https://github.com/GoogleChrome/puppeteer).

Made by [Raphael Amorim](https://github.com/raphamorim), Licensed by [MIT](License)
