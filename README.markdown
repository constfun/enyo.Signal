### What is it?

_enyo.Signal_ is a pubsub component for the Enyo framework.


### How do I use it?

Whether you want to send or subscribe to a signal, you include the same Signal component.

For signals that you intend to send you include a component like this one:

    {
        name: 'say_hello',
        kind: 'Signal',
    }

To send the signal, call the _send_ function on this component and pass any arguments that you want to include along with the signal:

    sendTheSay: function() {

        this.$.say_hello.send("World");
    }

To subscribe to this signal anywhere else in the application, create another Signal component and listen for the onReceive event:

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

By default the Signal component will re-use its enyo component _name_ as the name of the signal itself.  
In the rare cases where you need to name your enyo component different from the signal, you can supply the component name and the signal name explicitly:

    {
        name: 'mySignal',
        signal: 'say_hello',
        kind: 'Signal',
    }

    sendTheSay: function() {

        this.$.say_hello.send("World");
    }

When you send a signal, all components listening for that signal, regardless of where they are in the component hierarchy will fire their respective onReceive events.
