var TimeEntryStore = function() {
    this.initialize = function() {
        console.log("TimeEntryStore.initialize START");
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        console.log("TimeEntryStore.initialize DONE");
        return deferred.promise();
    }
    
    this.handlePunchedInEvent = function(date){
        handleEvent({event:"punchedIn", date: date});
    }

    this.handlePunchedOutEvent = function(date){
        handleEvent({event:"punchedOut", date: date});
    }

    var handleEvent = function(evt){
        events.push(evt);
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
