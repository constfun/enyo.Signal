/*
Copyright (C) 2011 by Nick Zalutskiy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

enyo.kind({
        name: 'enyo.Signal',
        kind: 'Component',
        published: {
                signal: ''
        },
        events: {
                onReceive: ''
        },
        statics: {
                _channels: {}
        },

        importProps: function(inProps) {
                this.inherited(arguments);

                this.signal = this.signal || this.name;
        },

        create: function() {
                this.inherited(arguments);

                // Initialize the channel for this signal, if the channel doesn't exist yet.
                var channels = enyo.Signal._channels;
                channels[ this.signal ] || (channels[ this.signal ] = []);

                // Register a new receiver if this instance of Signal registered for the onReceive event.
                if( this.onReceive ) {

                        channels[ this.signal ].push(this);
                }
        },

        destroy: function() {

                var receivers = enyo.Signal._channels[ this.signal ];
                if( !receivers ) {
                        return;
                }

                enyo.remove(this, receivers);
        },

        send: function() {

                var receivers = enyo.Signal._channels[ this.signal ];
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
