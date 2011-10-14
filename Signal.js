enyo.kind({
        name: 'enyo.Signal',
        kind: 'Component',
        published: {
                message: ''
        },
        events: {
                onReceive: ''
        },
        statics: {
                _channels: {}
        },

        importProps: function(inProps) {
                this.inherited(arguments);

                this.message = this.message || this.name;
        },

        create: function() {
                this.inherited(arguments);

                // Initialize the channel for this message, if the channel doesn't exist yet.
                var channels = enyo.Signal._channels;
                channels[ this.message ] || (channels[ this.message ] = []);

                // Register a new receiver if this instance of Signal registered for the onReceive event.
                if( this.onReceive ) {

                        channels[ this.message ].push(this);
                }
        },

        destroy: function() {

                var receivers = enyo.Signal._channels[ this.message ];
                if( !receivers ) {
                        return;
                }

                enyo.remove(this, receivers);
        },

        send: function() {

                var receivers = enyo.Signal._channels[ this.message ];
                // For each receiver we want to call:
                //      receiver.doReceive(...arguments passed into this 'send' function...).
                this._invoke.apply({}, [receivers, 'doReceive'].concat(enyo.cloneArray(arguments)));
        },

        // Calls a named method on each element in array.
        _invoke: function(arr, method) {

                var args = enyo.cloneArray(arguments, 2);
                return arr.map(function(value) {

                        return value[method].apply(value, args);
                });
        }
});
