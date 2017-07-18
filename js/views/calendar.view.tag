<calendar class="wrapper">
    <aside data-is="side-nav" class="side-nav"></aside>
    <div class="main">        
        <div data-is="breadcrumbs" class=breadcrumb></div>
        <div class="content">
            <div class="panel">
                <div class="content-header no-mg-top">
                    <i class="fa fa-newspaper-o"></i>
                    <div class="content-header-title">Calendar</div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="content-box">
                            <div id="full-calendar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>            
    </div>
    <script>        
        import postal from 'postal/lib/postal.lodash'
        import reduce from '../reducer'

        this.viewModel = {};

        let EventStore = opts.EventStore;

        subscribe(channel, topic) {
            let subscription = postal.subscribe({
                channel: channel,
                topic: topic,
                callback: function(data, envelope) {                    
                    let state = reduce(EventStore.events);

                    if(state.currentView !== 'calendar') {
                        this.unmount();
                    }

                }.bind(this)
            });

            return subscription;
        };

        this.subscribe('routing', 'admin.update.currentView');
    
    </script>
</calendar>