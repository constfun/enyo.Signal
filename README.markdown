Anytime you want to send or subscribe to a message, you include the same, Signal, component.

For messages that you intend to send you include a component like this one.

    {
        name: 'say_hello',
        kind: 'Signal',
    }

By default the Signal component will re-use its "name" as the name of the message. But in the rare cases where you need to name your component different from the message. You can supply the component name and message name separately.

    {
        name: 'mySignal',
        kind: 'Signal',
        message: 'say_hello',
    }

And send the message like so:

    sendTheSay: function() {

        this.$.say_hello.send("World");

        // or, if you named your component differently:
        //
        // this.$.mySignal.send("World");
    }


Subscribing to a message is exactly the same as subscribing to an event in enyo.
You create a Signal component for the message you are interested in and listen for the onReceive event:

    components:
    ....
    {
        name: 'say_hello',
        kind: 'Signal',
        onReceive: 'handleHello',
    }
    ....

    handleHello: function(sender, helloWhat) {

        enyo.log("Hello " + helloWhat + "!");
    }

