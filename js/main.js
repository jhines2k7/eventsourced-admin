import './views/home.view'
import './views/calendar.view'
import './views/chat.view'
import './components/top.nav'
import './components/side.nav'
import './components/breadcrumbs'

import Storage from './storage'
import {Router} from 'director/build/director'
import riot from 'riot'
import EventStore from './eventStore'
import config from './config'
import reduce from './reducer'

let home = function() {
    "use strict";
    
    if(document.getElementsByTagName('top-nav').length === 0) {
        document.body.appendChild(document.createElement('top-nav'));
        riot.mount('top-nav');
    }

    document.body.appendChild(document.createElement('home'));
    riot.mount('home', { EventStore: EventStore });
    
    EventStore.add(EventStore.events, [{
        channel: 'routing',
        topic: 'admin.update.currentView',
        data: 'home'
    }]);
};

let calendar = function() {
    "use strict";

    if(document.getElementsByTagName('top-nav').length === 0) {
        document.body.appendChild(document.createElement('top-nav'));
        riot.mount('top-nav');
    }

    document.body.appendChild(document.createElement('calendar'));
    riot.mount('calendar', { EventStore: EventStore });    

    EventStore.add(EventStore.events, [{
        channel: 'routing',
        topic: 'admin.update.currentView',
        data: 'calendar'
    }]);
}

let chat = function() {
    "use strict";

    if(document.getElementsByTagName('top-nav').length === 0) {
        document.body.appendChild(document.createElement('top-nav'));
        riot.mount('top-nav');
    }

    document.body.appendChild(document.createElement('chat'));
    riot.mount('chat', { EventStore: EventStore });    

    EventStore.add(EventStore.events, [{
        channel: 'routing',
        topic: 'admin.update.currentView',
        data: 'chat'
    }]);
}

let allRoutes = function() {
    document.querySelectorAll('.main-menu ul li').forEach( (li) => {
        li.className = '';
    });
    
    let state = reduce(EventStore.events);

    if(state.currentView === 'calendar') {
        document.querySelector("a[href='#/calendar']").parentElement.className = 'active';
    } else if(state.currentView === 'media') {
        document.querySelector("a[href='#/media']").parentElement.className = 'active';
    } else if(state.currentView === 'chat') {
        document.querySelector("a[href='#/chat']").parentElement.className = 'active';
    } else if(state.currentView === 'login') {
        document.querySelector("a[href='#/login']").parentElement.className = 'active';
    } else if(state.currentView === 'invoice') {
        document.querySelector("a[href='#/invoice']").parentElement.className = 'active';
    } else {
        document.querySelector("a[href='#/']").parentElement.className = 'active';
    }
}

let router = Router({
    '/': home,
    '/calendar': calendar,
    '/chat': chat/*,
    '/media': media,    
    '/login': login,
    'invoice': invoice*/
});

router.configure({
    on: allRoutes
});

Storage.get().then( (events) => {
    EventStore.events = events;

    router.init();
});
