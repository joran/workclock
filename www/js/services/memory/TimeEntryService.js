var TimeEntryService = function(store) {
    
    this.punchIn = function(){
        console.log("TimeEntryService.punchIn")
        store.handlePunchedInEvent(new Date());
    }
    
    this.punchOut = function(){
        console.log("TimeEntryService.punchOut")
        store.handlePunchedOutEvent(new Date());
    }
        
    this.timeToday = function(){
        var now = new Date();
        var lastPunchedInEvent = null;
        var totTime= Time.zero();
        for(var i = 0; i < events.length; i++){
            if(isSameDay(now, events[i].date)){
                if(events[i].event === "punchedIn"){
                    lastPunchedInEvent = events[i];
                } else if(events[i].event === "punchedOut"){
                    if(lastPunchedInEvent != null ){
                        lastPunchedInEvent = null;
                    }
                }
            }
        }
        if(lastPunchedInEvent != null){
            totTime = Time.sum(totTime, Time.untilNow(lastPunchedInEvent.date));
        }
        
        return totTime;
    }
    
    this.printDebug = function(){
/*
        console.log("TimeEntryService printDebug START");
*/
        console.log("TimeEntryService printDebug: time to day:",
                    this.timeToday().asString());
/*
        console.log("TimeEntryService printDebug DONE");
*/
/*
        var t = 73*60*1000 + 2000;
        var d1 = new Date();
        var d2 = new Date(d1.getTime()+t)
        console.log("TimeEntryService", Time.betweenDates(d2,d1).asString());

*/
        /*
        for(var i = 0; i < events.length; i++){
            console.log("TimeEntryService", events[i])
        }
        */
    }
    var events = [];
    var observers = [];
    
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
    Time.sum = function(t1, t2){
        var t = new Time(t2.getTime() + t1.getTime());
        return t;
    }
    Time.zero = function(){
        return new Time(0);
    }
}