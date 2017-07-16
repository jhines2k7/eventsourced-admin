export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'admin.update.greeting') {
            state.greeting = 'Hello World!';
        }

        return state;
    }, {
        greeting: 'Goodbye World!'
    });
}
