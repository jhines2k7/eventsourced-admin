export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'admin.update.currentView') {
            state.currentView = event.data;
        }

        return state;
    }, {
        currentView: 'home'
    });
}
