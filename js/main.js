import './views/home.view'
import './views/calendar.view'
import './views/chat.view'
import './views/media.view'
import './views/invoice.view'
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
    },{
        channel: 'async',
        topic: 'admin.update.breadcrumbs',
        data: {
            currentView: 'Home',
            subCategory: '',
            url: ''            
        }
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
    },{
        channel: 'async',
        topic: 'admin.update.breadcrumbs',
        data: {
            currentView: 'Calendar',
            subCategory: 'Scheduling',
            url: '#/calendar'            
        }
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
    },{
        channel: 'async',
        topic: 'admin.update.breadcrumbs',
        data: {
            currentView: 'Chat',
            subCategory: 'Communication',
            url: '#/chat'            
        }
    }]);
}

let media = function() {
    "use strict";

    if(document.getElementsByTagName('top-nav').length === 0) {
        document.body.appendChild(document.createElement('top-nav'));
        riot.mount('top-nav');
    }

    document.body.appendChild(document.createElement('media'));
    riot.mount('media', { EventStore: EventStore });    

    EventStore.add(EventStore.events, [{
        channel: 'routing',
        topic: 'admin.update.currentView',
        data: 'media'
    },{
        channel: 'async',
        topic: 'admin.update.breadcrumbs',
        data: {
            currentView: 'Images',
            subCategory: 'Media',
            url: '#/media'            
        }
    }]);
}

let invoice = function() {
    "use strict";

    if(document.getElementsByTagName('top-nav').length === 0) {
        document.body.appendChild(document.createElement('top-nav'));
        riot.mount('top-nav');
    }

    document.body.appendChild(document.createElement('invoice'));
    riot.mount('invoice', { EventStore: EventStore });    

    EventStore.add(EventStore.events, [{
        channel: 'routing',
        topic: 'admin.update.currentView',
        data: 'invoice'
    },{
        channel: 'async',
        topic: 'admin.update.breadcrumbs',
        data: {
            currentView: 'Invoice',
            subCategory: 'Billing',
            url: '#/invoice'            
        }
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
    '/chat': chat,
    '/media': media,
    '/invoice': invoice/*,    
    '/login': login*/,
});

router.configure({
    on: allRoutes
});

Storage.get().then( (events) => {
    EventStore.events = events;

    router.init();
});
