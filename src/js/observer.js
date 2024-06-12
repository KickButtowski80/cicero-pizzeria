const Observer = (function() {
    let events = {};

    return {
        subscribe: function(event, listener) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(listener);
        },
        unsubscribe: function(event, listenerToRemove) {
            if (!events[event]) return;

            events[event] = events[event].filter(listener => listener !== listenerToRemove);
        },
        notify: function(event, data) {
            if (!events[event]) return;

            events[event].forEach(listener => listener(data));
        }
    };
})();
