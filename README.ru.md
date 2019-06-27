# dom-selector-observer

[![NPM version](http://img.shields.io/npm/v/dom-selector-observer.svg?style=flat)](https://www.npmjs.org/package/dom-selector-observer)
[![Build Status](https://img.shields.io/travis/paulzi/dom-selector-observer/master.svg)](https://travis-ci.org/paulzi/dom-selector-observer)
[![Downloads](https://img.shields.io/npm/dt/dom-selector-observer.svg)](https://www.npmjs.org/package/dom-selector-observer)
![License](https://img.shields.io/npm/l/dom-selector-observer.svg)

Слежение за вставкой, перемещением и удалением элементов из DOM.

[English readme](https://github.com/paulzi/dom-selector-observer/)

## Установка

```sh
npm install dom-selector-observer
```

## Использование

```javascript
import DomSelectorObserver from 'dom-selector-observer';

class MyComponent {
    constructor(element) {
        this.element = element;
        // ваш код, например, добавление слушателей событий
    }
    
    refresh() {
        // ваш код, например, обновить размеры
    }
    
    destroy() {
        // ваш код, например, удаление слушателей событий
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

## Документация

### Варианты импорта

Есть несколько входных точек для импорта библиотеки:

- `import DomSelectorObserver from 'dom-selector-observer'` - аналогично `with-shims`;
- `import DomSelectorObserver from 'dom-selector-observer/standard'` - простой импорт без полифилов для ie11;
- `import DomSelectorObserver from 'dom-selector-observer/with-shims'` - импорт с прокладками для ie11;
- `import DomSelectorObserver from 'dom-selector-observer/with-polyfills'` - импорт с полифилами для ie11.

Отличия прокладок от полифилов можете прочитать в [polyshim](https://github.com/paulzi/polyshim/).

При прямом подключении скрипта из папки `dist` в браузер, получить экземпляр DomSelectorObserver можно через `window.DomSelectorObserver.default`.

### Методы

- `addAttachHandler(selector, handler)` - добавляет обработчик срабатывающий когда элемент соответствующий селектору вставляется в DOM
    - `selector {String}` - CSS-селектор
    - `handler {function(node)}` - обработчик
        - `node {Element}` - вставленный элемент
- `removeAttachHandler(selector[, handler])` - удаляет обработчик добавленный с помощью `addAttachHandler()`
    - `selector {String}` - CSS-селектор
    - `handler {function(node)}` - обработчик
- `addMoveHandler(selector, handler)` - добавляет обработчик срабатывающий когда элемент соответствующий селектору перемещается в DOM
    - `selector {String}` - CSS-селектор
    - `handler {function(node)}` - обработчик
        - `node {Element}` - перемещённый элемент
- `removeMoveHandler(selector[, handler])` - удаляет обработчик добавленный с помощью `addMoveHandler()`
    - `selector {String}` - CSS-селектор
    - `handler {function(node)}` - обработчик
- `addDetachHandler(selector, handler)` - добавляет обработчик срабатывающий когда элемент соответствующий селектору удаляется из DOM
    - `selector {String}` - CSS-селектор
    - `handler {function(node)}` - обработчик
        - `node {Element}` - удалённый элемент
- `removeDetachHandler(selector[, handler])` - удаляет обработчик добавленный с помощью `addDetachHandler()`
    - `selector {String}` - CSS-селектор
    - `handler {function(node)}` - обработчик
- `observe([processExisting])` - запускает слежение за DOM
    - `processExisting {boolean}` - обработать существующие элементы в DOM как вставку
- `unobserve()` - останавливает слежение за DOM
- `setShim([setMatches])` - задаёт прокладки для некроссбраузерных методов
    - `setMatches {Function|null}` - прокладка для `Element.prototype.matches`

## Testing

Для запуска тестов используйте:

```sh
npm test
```

При необходимости установите ланчеры для других браузеров и активируйте их в `karma.conf.js`:

```sh
npm i --save-dev karma-ie-launcher
```

## Поддержка браузерами

- Internet Explorer 11+
- Другие современные браузеры
