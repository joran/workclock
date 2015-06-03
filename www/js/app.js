// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
    /* ---------------------------------- Local Variables ---------------------------------- */
	HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    var store = new TimeEntryStore();
    store.initialize();
    
    var service = new TimeEntryService(store);
    var provider = new TimeToDayProvider(store);
    
    provider.addObserver(function(data){
        console.log("App TimeToDay observer", data);
    });
    
	var slider = new PageSlider($('body'));

    router.addRoute('', function() {
        slider.slidePage(new HomeView(service, provider).render().$el);
    });

    router.start();

    /* --------------------------------- Event Registration -------------------------------- */
	document.addEventListener('deviceready', function () {
		if (navigator.notification) { // Override default HTML alert with native dialog
			window.alert = function (message) {
				navigator.notification.alert(
					message,    // message
					null,       // callback
					"Workshop", // title
					'OK'        // buttonName
				);
			};
		}
	}, false);
    
    
    /* ---------------------------------- Local Functions ---------------------------------- */

}());