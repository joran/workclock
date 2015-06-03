var TimeEntryStore = function() {
    this.initialize = function() {
        console.log("TimeEntryStore.initialize START");
        // No Initialization required
        var deferred = $.Deferred();
        
        if(!window.localStorage.getItem("events")){
            this.clearStore();
        }
        var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
        console.log("openDatabase", cordova, db);
        deferred.resolve();
        console.log("TimeEntryStore.initialize DONE");
        return deferred.promise();
    }
    this.clearStore = function(){
        window.localStorage.setItem("events", JSON.stringify([]));
    }
    this.handlePunchedInEvent = function(date){
        handleEvent({event:"punchedIn", date: date});
    }

    this.handlePunchedOutEvent = function(date){
        handleEvent({event:"punchedOut", date: date});
    }

    var handleEvent = function(evt){
        events.push(evt);
        var evts = JSON.parse(window.localStorage.getItem("events"));
        evts.push(evt);
        window.localStorage.setItem("events", JSON.stringify(evts));
        console.log("localStorage", window.localStorage);
        publishEvent(evt);
    }
    
    this.addObserver = function(callback){
        observers.push(callback);
        replayEvents(callback);
    }
    
    var publishEvent = function(evt){
        for(var i = 0; i < observers.length; i++){
            observers[i](evt);
        }
    }

    var replayEvents = function(observer){
        for(var i = 0; i < events.length; i++){
            observer(events[i]);
        }
    }

    var events = [];
    var observers = [];
}
