export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'admin.update') {
            console.log(event.data);
        }

        return state;
    }, {
        greeting: 'Goodbye World!'
    });
}
