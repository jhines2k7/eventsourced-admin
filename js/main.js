import './views/home.view'
import './views/chat.view'
import './views/media.view'
import './views/invoice.view'
import './views/login.view'
import './components/top.nav'
import './components/side.nav'
import './components/profile.quicklinks'

import Storage from './storage'
import {Router} from 'director/build/director'
import riot from 'riot'
import EventStore from './eventStore'
import config from './config'
import reduce from './reducer'

let home = function() {
    'use strict';
    
    fetch(`http://${config.domain}:8282/home`).then( (response) => {
        if(response.ok) {
            return response.json();
        }

        throw new Error('There was an error while making the request.');
    }).then( (data) => {
        if(document.getElementsByTagName('top-nav').length === 0) {
            document.body.appendChild(document.createElement('top-nav'));
            riot.mount('top-nav', { EventStore: EventStore });
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
        }, {
            channel: 'async',
            topic: 'admin.update.home',
            data: data
        }]);
    }).catch( (error) => {
        console.log(`ERROR: ${error.message}`);

        EventStore.add(EventStore.events, [{
            channel: 'async',
            topic: 'admin.async.request.failure'
        }]);
    });    
};

let chat = function() {
    'use strict';

    if(document.getElementsByTagName('top-nav').length === 0) {
        document.body.appendChild(document.createElement('top-nav'));
        riot.mount('top-nav', { EventStore: EventStore });
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
    'use strict';

    if(document.getElementsByTagName('top-nav').length === 0) {
        document.body.appendChild(document.createElement('top-nav'));
        riot.mount('top-nav', { EventStore: EventStore });
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
    'use strict';

    if(document.getElementsByTagName('top-nav').length === 0) {
        document.body.appendChild(document.createElement('top-nav'));
        riot.mount('top-nav', { EventStore: EventStore });
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

let login = function() {
    'use strict';

    if(document.getElementsByTagName('login').length === 0) {
        document.body.appendChild(document.createElement('login'));
        riot.mount('login', { EventStore: EventStore });
    }

    EventStore.add(EventStore.events, [{
        channel: 'routing',
        topic: 'admin.update.currentView',
        data: 'login'
    }]);
}

let logout = function() {
    'use strict';

    EventStore.add(EventStore.events, [{
        channel: 'async',
        topic: 'admin.signout.success',
        data: {
            name: '',
            isLoggedIn: false,
            role: ''
        }
    }]);

    Router().init().setRoute('/login');        
}

let allRoutes = function() {
    document.querySelectorAll('.main-menu ul li').forEach( (li) => {
        li.className = '';
    });
    
    let state = reduce(EventStore.events);

    if(!state.user.isLoggedIn) {
        Router().init().setRoute('/login');
    } else {
        if(state.currentView === 'media') {
            document.querySelector(".main-menu ul li a[href='#/media']").parentElement.className = 'active';
        } else if(state.currentView === 'chat') {
            document.querySelector(".main-menu ul li a[href='#/chat']").parentElement.className = 'active';
        } else if(state.currentView === 'invoice') {
            document.querySelector(".main-menu ul li a[href='#/invoice']").parentElement.className = 'active';
        }
    }    
}

let router = Router({
    '/': home,
    '/chat': chat,
    '/media': media,
    '/invoice': invoice,    
    '/login': login,
    '/logout': logout
});

router.configure({
    on: allRoutes
});

Storage.get().then( (events) => {
    EventStore.events = events;

    router.init();
});
