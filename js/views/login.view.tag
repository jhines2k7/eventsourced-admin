<login>
    <div class="auth-wrapper">
        <div class="auth-header">
            <div class="auth-title">Pongo</div>
            <div class="auth-subtitle">Simple and Clean Admin Template</div>
            <div class="auth-label">Login</div>
        </div>
        <div class="auth-body">
            <div class="auth-content">
                <div class="form-group">
                    <label>Email</label>
                    <input ref="email" class="form-control" placeholder="Enter email" type="email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input ref="password" class="form-control" placeholder="Enter password" type="password">
                </div>
            </div>
            <div class="auth-footer sm-text-center">
                <button class="btn btn-primary sm-max" onclick={ doLogin }>Log me in</button>
                <div class="pull-right auth-link sm-max sm-mgtop-20">
                    <label class="check-label"><input type="checkbox"> Remember Me</label>
                    <div class="devider"></div>
                    <a href="">Forgot Password?</a>
                </div>
            </div>
        </div>
    </div>

    <script>
        import postal from 'postal/lib/postal.lodash'
        import reduce from '../reducer'
        import {Router} from 'director/build/director'

        let EventStore = opts.EventStore;

        subscribe(channel, topic) {
            let subscription = postal.subscribe({
                channel: channel,
                topic: topic,
                callback: function(data, envelope) {                    
                    let state = reduce(EventStore.events);

                    if(state.currentView !== 'login') {
                        this.unmount();
                    }

                }.bind(this)
            });

            return subscription;
        };

        doLogin(e) {
            e.preventDefault();

            let email = this.refs.email.value;
            let password = this.refs.password.value;

            EventStore.add(EventStore.events, [{
                channel: 'async',
                topic: 'admin.update.user',
                data: {
                    name: 'Lupita Nyong\'o',
                    isLoggedIn: true,
                    role: 'Administrator',
                    location: 'Columbus, OH'
                }
            }]);

            Router().init().setRoute('/');
        }

        this.subscribe('routing', 'admin.update.currentView');
    </script>
</login>