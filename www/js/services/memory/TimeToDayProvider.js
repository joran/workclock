var TimeToDayProvider = function(store) {
    var events = [];
    var observers = [];
    var state = {};
    var timer = null;
    
    store.addObserver(function(evt){
        console.log("TimeToDayProvider store callback", evt);
        events.push(evt);
        state = newState(state, evt, calculateTime(events));
        publish(state);
        
        if(timer !== null){
            clearInterval(timer);
        }
        if(state.lastPunchedInEvent){
            timer = setInterval(function(){
                state = newState(state, null, calculateTime(events));
                console.log("TimeToDayProvider timer", state);
                publish(state);
            }, 1000);
        }
    });
    
    this.addObserver = function(callback){
        observers.push(callback);
    };
        
    var newState = function(s, evt, time){
        var t = time || (s?s.time:null);
        var e = evt || (s?s.lastPunchedInEvent:null);
        var newS = {};
        if(t){
            newS.time = t;
        }
        if(e && e.event === "punchedIn"){
            newS.lastPunchedInEvent=e;
        }
        return newS;
    };
    
    var calculateTime = function(evts){
        var now = new Date();
        var totTime= Time.zero();
        var latestPunchedInEvent = null;
        for(var i = 0; i < events.length; i++){
            var evt = evts[i];
            if(isSameDay(now, evt.date)){
                if(evt.event === "punchedIn"){
                    latestPunchedInEvent = evt;
                } else if(evt.event === "punchedOut"){
                    totTime = Time.sum(totTime, Time.sub(evt.date, latestPunchedInEvent.date));
                    latestPunchedInEvent = null;
                }
            }
        }
        if(latestPunchedInEvent != null){
            totTime = Time.sum(totTime, Time.untilNow(latestPunchedInEvent.date));
        }
       
        return totTime;
    }

    var publish = function(s){
        var data = {};
        if(s.time){
            data.time = s.time.asString();
        }
        if(s.lastPunchedInEvent){
            data.lastPunchedIn = s.lastPunchedInEvent.date
        }
        for(var i = 0; i < observers.length ; i++){
            observers[i](data);
        }
    }
    var isSameDay = function(d1,d2){
        var isSame = 
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
        return isSame;
    }

    var Time = function(ms){
        var timeInMillis = ms||0;
        timeInMillis -= timeInMillis%1000;
        
        var secondMs = 1000;
        var minuteMs = secondMs * 60;
        var hourMs = minuteMs *60;
        var dayMs = hourMs * 24;

        this.getTime = function(){
            return timeInMillis;
        }
        this.getDays = function() {
            return Math.floor(timeInMillis/dayMs);
        }
        this.getHours = function() {
            return Math.floor(timeInMillis/hourMs);
        }
        this.getMinutes = function() {
            return Math.floor(timeInMillis/minuteMs);
        }
        this.getSeconds = function() {
            return Math.floor(timeInMillis/secondMs);
        }
        
        this.asString = function(){
            var pad = "00",
                h = "" + this.getHours(),
                m = "" + (this.getMinutes()%60),
                s = "" + (this.getSeconds()%60); 
            
            return (pad.substring(h.length)+h) + ":" 
                + ((pad.substring(m.length)+m)) + ":" 
                + ((pad.substring(s.length)+s));
        }
    }
    
    Time.untilNow = function(d){
        return Time.betweenDates(new Date(), d)
    }
    Time.betweenDates = function(d1, d2){
        if(d1 < d2){
            return new Time(d2.getTime() - d1.getTime());
        } else {
            return new Time(d1.getTime() - d2.getTime());
        }
    }
    Time.sub = function(d1, d2){
        if(d1.getTime() < d2.getTime()){
            return new Time(d2.getTime() - d1.getTime());
        } else {
            return new Time(d1.getTime() - d2.getTime());
        }
    }
    Time.sum = function(t1, t2){
        var t = new Time(t2.getTime() + t1.getTime());
        return t;
    }
    Time.zero = function(){
        return new Time(0);
    }
}