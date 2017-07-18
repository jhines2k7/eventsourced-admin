export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'admin.update.currentView') {
            state.currentView = event.data;
        }

        if(event.topic === 'admin.update.breadcrumbs') {
            state.breadcrumbs.currentView = event.data.currentView;
            state.breadcrumbs.subCategory = event.data.subCategory;
            state.breadcrumbs.url = event.data.url;
        }

        return state;
    }, {
        currentView: 'home',
        breadcrumbs: {
            currentView: 'Home',
            subCategory: '',
            url: ''
        }
    });
}
