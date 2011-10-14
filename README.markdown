### What is it?

_enyo.Signal_ is a pubsub component for the Enyo framework.


### How do I use it?

Whether you want to send or subscribe to a message, you include the same Signal component.

For messages that you intend to send you include a component like this one:

    {
        name: 'say_hello',
        kind: 'Signal',
    }

By default the Signal component will re-use its _name_ as the name of the message.  
In the rare cases where you need to name your component different from the message, you can supply the component name and message name explicitly:

    {
        name: 'mySignal',
        message: 'say_hello',
        kind: 'Signal',
    }

To send the message, call the _send_ function on the Signal component and pass any arguments that you want to include with the message:

    sendTheSay: function() {

        this.$.say_hello.send("World");

        // or, if you named your component differently:
        //
        // this.$.mySignal.send("World");
    }


To subscribe to a message, create a Signal component for the message that you are interested in and listen for the onReceive event:

    components:
    ...
    {
        name: 'say_hello',
        kind: 'Signal',
        onReceive: 'handleHello',
    }
    ...

    handleHello: function(sender, helloWhat) {

        enyo.log("Hello " + helloWhat + "!");
    }

When you send a message, all Signal components listening for that message will fire the onReceive event, regardless of where they are in the component heirarchy.
