import Promise from "core-js/stable/promise";
import DomSelectorObserver from '../with-shims';

const chai   = require('chai');
const assert = chai.assert;

// shorthands

describe("dom-selector-observer tests", function() {

    it('basic test', function() {
        let pass = 0;
        DomSelectorObserver.observe();
        let element = document.createElement('div');
        element.classList.add('component1');

        let attachPromise = new Promise(resolve => {
            DomSelectorObserver.addAttachHandler('.component1', function(node) {
                pass++;
                assert.strictEqual(element, node);
                resolve();
            });
        });
        let detachPromise = new Promise(resolve => {
            DomSelectorObserver.addDetachHandler('.component1', function(node) {
                pass++;
                assert.strictEqual(element, node);
                resolve();
            });
        });

        return Promise.resolve()
            .then(() => {
                document.body.appendChild(element);
                return attachPromise;
            })
            .then(() => {
                document.body.removeChild(element);
                return detachPromise;
            })
            .then(() => {
                DomSelectorObserver.unobserve();
                assert.strictEqual(pass, 2);
            });
    });


    it('existing components', function() {
        let pass = false;
        let element = document.createElement('div');
        element.classList.add('component2');
        document.body.appendChild(element);
        let attachPromise = new Promise(resolve => {
            DomSelectorObserver.addAttachHandler('.component2', function(node) {
                pass = true;
                assert.strictEqual(element, node);
                resolve();
            });
        });
        return Promise.resolve()
            .then(() => {
                DomSelectorObserver.observe(true);
                return attachPromise;
            })
            .then(() => {
                DomSelectorObserver.unobserve();
                assert.isTrue(pass);
            });
    });


    it('nested components', function() {
        let pass = 0;
        DomSelectorObserver.observe();
        let attachPromise = new Promise(resolve => {
            DomSelectorObserver.addAttachHandler('.component3', function() {
                if (++pass === 3) {
                    resolve();
                }
            });
        });
        return Promise.resolve()
            .then(() => {
                document.body.insertAdjacentHTML('afterend', `
                <div>
                    <div class="component3"></div>
                    <div class="component3">
                        <div class="component3"></div>                    
                    </div>
                </div>
                `);
                return attachPromise;
            })
            .then(() => {
                DomSelectorObserver.unobserve();
                assert.strictEqual(pass, 3);
            });
    });


    it('move node', function() {
        let pass = 0;
        DomSelectorObserver.observe();
        let container = document.createElement('div');
        let element = document.createElement('div');
        element.classList.add('component4');
        document.body.appendChild(container);
        let attachPromise = new Promise(resolve => {
            DomSelectorObserver.addAttachHandler('.component4', function(node) {
                pass++;
                assert.strictEqual(element, node);
                resolve();
            });
        });
        let movePromise = new Promise(resolve => {
            DomSelectorObserver.addMoveHandler('.component4', function(node) {
                pass++;
                assert.strictEqual(element, node);
                resolve();
            });
        });
        let detachPromise = new Promise(resolve => {
            DomSelectorObserver.addDetachHandler('.component4', function(node) {
                pass++;
                assert.strictEqual(element, node);
                resolve();
            });
        });
        return Promise.resolve()
            .then(() => {
                document.body.appendChild(element);
                return attachPromise;
            })
            .then(() => {
                container.appendChild(element);
                return movePromise;
            })
            .then(() => {
                container.removeChild(element);
                return detachPromise;
            })
            .then(() => {
                DomSelectorObserver.unobserve();
                assert.strictEqual(pass, 3);
            });
    });


    it('double delete', function() {
        let pass = 0;
        DomSelectorObserver.observe();
        let container = document.createElement('div');
        let element = document.createElement('div');
        element.classList.add('component5');
        let attachPromise = new Promise(resolve => {
            DomSelectorObserver.addAttachHandler('.component5', function(node) {
                pass++;
                assert.strictEqual(element, node);
                resolve();
            });
        });
        let detachPromise = new Promise(resolve => {
            DomSelectorObserver.addDetachHandler('.component5', function(node) {
                pass--;
                assert.strictEqual(element, node);
                resolve();
            });
        });
        return Promise.resolve()
            .then(() => {
                container.appendChild(element);
                document.body.appendChild(container);
                return attachPromise;
            })
            .then(() => {
                document.body.removeChild(container);
                container.removeChild(element);
                return detachPromise;
            })
            .then(() => {
                DomSelectorObserver.unobserve();
                assert.strictEqual(pass, 0);
            });
    });


    it('delete handlers', function() {
        let pass = 0;
        DomSelectorObserver.observe();
        let element = document.createElement('div');
        element.classList.add('component6');
        let container = document.createElement('div');
        document.body.appendChild(container);

        let attachHandler, detachHandler, moveHandler;
        let attachPromise = new Promise(resolve => {
            attachHandler = node => {
                pass += 1;
                assert.strictEqual(element, node);
                resolve();
            };
            DomSelectorObserver.addAttachHandler('.component6', attachHandler);
        });
        let movePromise = new Promise(resolve => {
            moveHandler = node => {
                pass += 10;
                assert.strictEqual(element, node);
                resolve();
            };
            DomSelectorObserver.addMoveHandler('.component6', moveHandler);
        });
        let detachPromise = new Promise(resolve => {
            detachHandler = node => {
                pass += 100;
                assert.strictEqual(element, node);
                resolve();
            };
            DomSelectorObserver.addDetachHandler('.component6', detachHandler);
        });

        return Promise.resolve()
            .then(() => {
                container.appendChild(element);
                return attachPromise;
            })
            .then(() => {
                document.body.appendChild(element);
                return movePromise;
            })
            .then(() => {
                document.body.removeChild(element);
                return detachPromise;
            })
            .then(() => {
                assert.strictEqual(pass, 111);
                DomSelectorObserver.removeAttachHandler('.component6', attachHandler);
                DomSelectorObserver.removeMoveHandler('.component6', moveHandler);
                DomSelectorObserver.removeDetachHandler('.component6', detachHandler);
                container.appendChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                document.body.appendChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                document.body.removeChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                DomSelectorObserver.unobserve();
                assert.strictEqual(pass, 111);
            });
    });


    it('attach without detach', function() {
        let pass = 0;
        DomSelectorObserver.observe();
        let element = document.createElement('div');
        element.classList.add('component7');
        let attachPromise = new Promise(resolve => {
            DomSelectorObserver.addAttachHandler('.component7', function(node) {
                pass++;
                assert.strictEqual(element, node);
                resolve();
            });
        });
        return Promise.resolve()
            .then(() => {
                document.body.appendChild(element);
                return attachPromise;
            })
            .then(() => {
                let container = document.createElement('div');
                document.body.appendChild(container);
                container.appendChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                DomSelectorObserver.unobserve();
                assert.strictEqual(pass, 1);
            });
    });


    it('check duplication of events', function() {
        let pass = 0;
        DomSelectorObserver.observe();
        let element = document.createElement('div');
        let container = document.createElement('div');
        document.body.appendChild(container);
        element.classList.add('component8');
        DomSelectorObserver.addAttachHandler('.component8', () => { pass += 1; });
        DomSelectorObserver.addMoveHandler('.component8', () => { pass += 10; });
        DomSelectorObserver.addDetachHandler('.component8', () => { pass += 100; });
        return Promise.resolve()
            .then(() => {
                container.appendChild(element);
                container.removeChild(element);
                container.appendChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                assert.strictEqual(pass, 1);
                document.body.appendChild(element);
                container.appendChild(element);
                document.body.appendChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                assert.strictEqual(pass, 11);
                document.body.removeChild(element);
                container.appendChild(element);
                container.removeChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                assert.strictEqual(pass, 111);
                DomSelectorObserver.unobserve();
            });
    });


    it('no events if no action', function() {
        let pass = 0;
        let element = document.createElement('div');
        let container = document.createElement('div');
        document.body.appendChild(container);
        container.appendChild(element);
        element.classList.add('component9');
        DomSelectorObserver.addAttachHandler('.component9', () => { pass += 1; });
        DomSelectorObserver.addMoveHandler('.component9', () => { pass += 10; });
        DomSelectorObserver.addDetachHandler('.component9', () => { pass += 100; });
        DomSelectorObserver.observe(true);
        return Promise.resolve()
            .then(() => {
                assert.strictEqual(pass, 1);
                container.removeChild(element);
                container.appendChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                assert.strictEqual(pass, 11);
                container.removeChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                assert.strictEqual(pass, 111);
                container.appendChild(element);
                container.removeChild(element);
                return new Promise(resolve => {
                    setTimeout(resolve, 50);
                });
            })
            .then(() => {
                assert.strictEqual(pass, 111);
                DomSelectorObserver.unobserve();
            });
    });
});