import Observer from './observer.js';

const Store = (function(observer) {
    let state = {
        items: []
    };

    const mutations = {
        addItem(state, item) {
            state.items.push(item);
        }
    };

    function commit(mutation, payload) {
        if (mutations[mutation]) {
            mutations[mutation](state, payload);
            observer.notify('stateChange', state);
        }
    }

    function addItem(item) {
        commit('addItem', item);
    }

    function getItems() {
        return state.items.slice();
    }

    return {
        addItem,
        getItems,
        subscribe: observer.subscribe,
        unsubscribe: observer.unsubscribe
    };
})(Observer);

export default Store;
