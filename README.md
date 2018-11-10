# ayzee.js

A minimal API wrapper for IntersectionObserver. Listen to enter and exit events of DOM-elements.

## Installation

Download the [latest release](https://unpkg.com/ayzee/lib/ayzee.min.js) or install via [npm](http://npmjs.com/package/ayzee):

```sh
npm install --save ayzee
```
---

## Getting started

```javascript
import ayzee from 'ayzee'

const ay = ayzee()

// Register DOM-element to ayzee registry
const observerdElement = ay(document.querySelector('.yourElement'))

// Add listener to observed element
const handleEnter = (el) => console.log(`${el} entered viewport`)
observedElement.on('enter', handleEnter)

const handleLeave = (el) => console.log(`${el} left viewport`)
observedElement.on('exit', handleLeave)

// Remove listener to observed element ...
observedElement.off('enter', handleEnter)
```

## API
...

---

## Recipes

#### Only listen once

```javascript
const observedElement = ay(document.querySelector('.onlyOnce'))

// Second argument of listener function is the registered instance,
// so you can call .off to cancel listening
const handleEnter = (el, instance) => {
  instance.off('enter', handleEnter)
}

observedElement.on('enter', handleEnter)
```
