// can shim
let matches = Element.prototype.matches;

let observer;
let attachHandlers = new Map();
let moveHandlers   = new Map();
let detachHandlers = new Map();
let selectors      = new Map();

/**
 * @param {Map} target
 * @param {String} selector
 * @param {Function} handler
 */
function addHandler(target, selector, handler) {
    let handlers = target.get(selector);
    if (!handlers) {
        handlers = new Map();
        target.set(selector, handlers);
    }
    handlers.set(handler, true);
    selectors.set(selector, true);
}

/**
 * @param {Map} target
 * @param {String} selector
 * @param {Function} handler
 */
function removeHandler(target, selector, handler) {
    if (!handler) {
        target.delete(selector);
    } else {
        let handlers = target.get(selector);
        handlers && handlers.delete(handler);
    }
    let exist = false;
    [attachHandlers, detachHandlers, moveHandlers].forEach(item => {
        let handlers = item.get(selector);
        if (handlers && handlers.size > 0) {
            exist = true;
        }
    });
    if (!exist) {
        selectors.delete(selector);
    }
}

/**
 * @param {MutationRecord[]} mutations
 */
function processMutations(mutations) {
    let state = new Map();
    mutations.forEach(mutation => {
        const ELEMENT_NODE = Node.ELEMENT_NODE;
        let removed = mutation.removedNodes;
        let added   = mutation.addedNodes;
        for (let i = 0; i < removed.length; i++) {
            let node = removed[i];
            if (node.nodeType === ELEMENT_NODE) {
                processMutation(state, node);
            }
        }
        for (let i = 0; i < added.length; i++) {
            let node = added[i];
            if (node.nodeType === ELEMENT_NODE) {
                processMutation(state, node);
            }
        }
    });
    processState(state);
}

/**
 * @param {Map} state
 * @param {Element} node
 */
function processMutation(state, node) {
    selectors.forEach((isTrue, selector) => {
        if (matches.call(node, selector)) {
            markNodeState(state, node, selector);
        }
        let nodes = node.querySelectorAll(selector);
        for (let i = 0; i < nodes.length; i++) {
            markNodeState(state, nodes[i], selector);
        }
    });
}

/**
 * @param {Map} state
 * @param {Element} node
 * @param {String} selector
 */
function markNodeState(state, node, selector) {
    let nodes = state.get(selector);
    if (!nodes) {
        nodes = new Map();
        state.set(selector, nodes);
    }
    nodes.set(node, true);
}

/**
 * @param {Map} state
 */
function processState(state) {
    const KEY = '_dom-selector-observer';
    state.forEach((nodes, selector) => {
        nodes.forEach((isTrue, node) => {
            let oldState = node[KEY];
            let newState = document.documentElement.contains(node);
            node[KEY] = newState;
            let target;
            if (newState) {
                target = oldState ? moveHandlers : attachHandlers;
            } else {
                target = oldState ? detachHandlers : null;
            }
            let handlers = target && target.get(selector);
            if (handlers) {
                handlers.forEach((isTrue, handler) => {
                    handler(node);
                });
            }
        });
    });
}

export default {
    /**
     * Set shims
     * @param {Function|null} [setMatches]
     */
    setShim: function(setMatches) {
        matches = setMatches || matches;
    },

    /**
     * Add init handler for selector
     * @param {String} selector
     * @param {Function} handler
     */
    addAttachHandler: function(selector, handler) {
        addHandler(attachHandlers, selector, handler);
    },

    /**
     * Remove init handler for selector
     * @param {String} selector
     * @param {Function} [handler]
     */
    removeAttachHandler: function(selector, handler) {
        removeHandler(attachHandlers, selector, handler);
    },

    /**
     * Add destroy handler for selector
     * @param {String} selector
     * @param {Function} handler
     */
    addMoveHandler: function(selector, handler) {
        addHandler(moveHandlers, selector, handler);
    },

    /**
     * Remove destroy handler for selector
     * @param {String} selector
     * @param {Function} [handler]
     */
    removeMoveHandler: function(selector, handler) {
        removeHandler(moveHandlers, selector, handler);
    },

    /**
     * Add destroy handler for selector
     * @param {String} selector
     * @param {Function} handler
     */
    addDetachHandler: function(selector, handler) {
        addHandler(detachHandlers, selector, handler);
    },

    /**
     * Remove destroy handler for selector
     * @param {String} selector
     * @param {Function} [handler]
     */
    removeDetachHandler: function(selector, handler) {
        removeHandler(detachHandlers, selector, handler);
    },

    /**
     * Start watching DOM
     * @param {boolean} [processExisting]
     * @returns {MutationObserver}
     */
    observe: function(processExisting) {
        if (observer) {
            throw new Error('dom-selector-observer already watch');
        }
        observer = new MutationObserver(processMutations);
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
        if (processExisting) {
            let state = new Map();
            processMutation(state, document.documentElement);
            processState(state);
        }
        return observer;
    },

    /**
     * Stop watching DOM
     */
    unobserve: function() {
        observer.disconnect();
        observer = null;
    },
};
