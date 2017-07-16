import './views/home.view'
import './components/top.nav'

import Storage from './storage'
import {Router} from 'director/build/director'
import riot from 'riot'
import EventStore from './eventStore'
import config from './config'

let home = function() {
    "use strict";

    document.body.appendChild(document.createElement('home'));
    riot.mount('home', { EventStore: EventStore });

    document.body.appendChild(document.createElement('top-nav'));
    riot.mount('top-nav');

    EventStore.add(EventStore.events, [{
        channel: 'async',
        topic: 'admin.update.greeting',
        data: 'Hello World!'
    }]);
};

let router = Router({
    '/': home
});

Storage.get().then( (events) => {
    EventStore.events = events;

    router.init();
});
