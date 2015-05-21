var HomeView = function (service, provider) {
    var thiz = this;
    var data = {time:""};
    
    provider.addObserver(function(d){
        data = d;
        thiz.render();
    });
    
    this.startClock = function(){
        console.log("HomeView.startClock");
        service.punchIn();
    };
    this.stopStartClock = function(){
        console.log("HomeView.stopStartClock");
        service.punchOut();
        service.punchIn();
    };
    this.stopClock = function(){
        console.log("HomeView.stopClock");
        service.punchOut();
    };
	this.render = function() {
        console.log("HomeView.render START");
		this.$el.html(this.template(data));
		$('.content', this.$el).html("Some content");
        console.log("HomeView.render DONE");
		return this;
	};

    this.initialize = function () {
        console.log("HomeView.initialize START");
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on("click", ".start-btn", this.startClock);
        this.$el.on("click", ".stop-start-btn", this.stopStartClock);
        this.$el.on("click", ".stop-btn", this.stopClock);
        console.log("HomeView.initialize DONE");
    };
 
    this.initialize();

}