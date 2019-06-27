# dom-selector-observer

[![NPM version](http://img.shields.io/npm/v/dom-selector-observer.svg?style=flat)](https://www.npmjs.org/package/dom-selector-observer)
[![Build Status](https://img.shields.io/travis/paulzi/dom-selector-observer/master.svg)](https://travis-ci.org/paulzi/dom-selector-observer)
[![Downloads](https://img.shields.io/npm/dt/dom-selector-observer.svg)](https://www.npmjs.org/package/dom-selector-observer)
![License](https://img.shields.io/npm/l/dom-selector-observer.svg)

Observation the attach, move and detach of elements in DOM.

[Russian readme](https://github.com/paulzi/dom-selector-observer/blob/master/README.ru.md)

## Install

```sh
npm install dom-selector-observer
```

## Usage

```javascript
import DomSelectorObserver from 'dom-selector-observer';

class MyComponent {
    constructor(element) {
        this.element = element;
        // your code, for example, add event listeners
    }
    
    refresh() {
        // your code, for example, update sizes
    }
    
    destroy() {
        // your code, for example, remove event listeners
    }
}

DomSelectorObserver.addAttachHandler('.my-component', function(element) {
    element.myComponent = new MyComponent(element);
});

DomSelectorObserver.addMoveHandler('.my-component', function(element) {
    element.myComponent.refresh();
});

DomSelectorObserver.addAttachHandler('.my-component', function(element) {
    element.myComponent.destroy();
});
```

## Documentation

### Import types

There are several entry points for importing a library:

- `import DomSelectorObserver from 'dom-selector-observer'` - similarly `with-shims`;
- `import DomSelectorObserver from 'dom-selector-observer/standard'` - easy import without polyfills for ie11;
- `import DomSelectorObserver from 'dom-selector-observer/with-shims'` - import with shims for ie11;
- `import DomSelectorObserver from 'dom-selector-observer/with-polyfills'` - import with polyfill for ie11;

Differences shims from polyfills you can read in [polyshim](https://github.com/paulzi/polyshim/) package.

When directly include the script from the `dist` folder to the browser, you can get an DomSelectorObserver instance via `window.DomSelectorObserver.default`.

### Methods

- `addAttachHandler(selector, handler)` - add handler when element match selector attached to DOM
    - `selector {String}` - CSS-selector
    - `handler {function(node)}` - handler function
        - `node {Element}` - attached element
- `removeAttachHandler(selector[, handler])` - remove handler added with `addAttachHandler()`
    - `selector {String}` - CSS-selector
    - `handler {function(node)}` - handler function
- `addMoveHandler(selector, handler)` - add handler when element match selector moved in DOM
    - `selector {String}` - CSS-selector
    - `handler {function(node)}` - handler function
        - `node {Element}` - moved element
- `removeMoveHandler(selector[, handler])` - remove handler added with `addMoveHandler()`
    - `selector {String}` - CSS-selector
    - `handler {function(node)}` - handler function
- `addDetachHandler(selector, handler)` - add handler when element match selector detached from DOM
    - `selector {String}` - CSS-selector
    - `handler {function(node)}` - handler function
        - `node {Element}` - detached element
- `removeDetachHandler(selector[, handler])` - remove handler added with `addDetachHandler()`
    - `selector {String}` - CSS-selector
    - `handler {function(node)}` - handler function
- `observe([processExisting])` - start observing DOM
    - `processExisting {boolean}` - process attach handlers for existing elements in DOM
- `unobserve()` - stop observing DOM
- `setShim([setMatches])` - sets shims for non-cross-browser methods
    - `setMatches {Function|null}` - shim for `Element.prototype.matches`

## Testing

To run tests, use: 

```sh
npm test
```

If necessary, you can install launchers for other browsers and activate them in `karma.conf.js`: 

```sh
npm i --save-dev karma-ie-launcher
```

## Browsers support

- Internet Explorer 11+
- Other modern browsers
