
window.addEventListener('WebComponentsReady', function() {
	var reg;
	var sub;
	var isSubscribed = false;
	var toggle = document.getElementById('enable-push');
	var subscriptionContainer = document.getElementById('subscription-container');
	var subscriptionId = document.getElementById('subscription-id');

	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.register('sw-push.js').then(function() {
	    return navigator.serviceWorker.ready;
	  }).then(function(serviceWorkerRegistration) {
	  	reg = serviceWorkerRegistration;
	  	toggle.disabled = false;
	    reg.pushManager.subscribe({userVisibleOnly: true})
	  });
	}

	toggle.addEventListener('change', function() {
		if (toggle.checked) {
			subscribe();
		} else {
			unsubscribe();
		}
	});

	function subscribe() {
	  reg.pushManager.subscribe({userVisibleOnly: true}).then(function(pushSubscription){
	    sub = pushSubscription;
	    console.log('Subscribed! Endpoint:', sub.endpoint);
	    isSubscribed = true;
	    subscriptionContainer.style.visibility = "";
	    subscriptionId.innerHTML = getId(sub.endpoint);
	  });
	}

	function getId(str) {
		return /[^\/]*$/.exec(str);
	}

	function unsubscribe() {
	  sub.unsubscribe().then(function(event) {
	    console.log('Unsubscribed!', event);
	    isSubscribed = false;
	    subscriptionContainer.style.visibility = "hidden";
	  }).catch(function(error) {
	    console.log('Error unsubscribing', error);
	  });
	}
});