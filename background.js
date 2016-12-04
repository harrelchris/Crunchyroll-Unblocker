function setCookie (tld) {
	var xhr = new XMLHttpRequest();
	xhr.timeout = 5000;
	xhr.ontimeout = function () {
		browser.notifications.create("", {type: "basic", title: "Request Timed Out", message: "Crunchyroll Unblocker has encounted an error", iconUrl: "crunblock128.png"}, function (notificationId) {});
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			browser.cookies.remove({url: "http://crunchyroll" + tld + "/", name: "sess_id"});
			browser.cookies.set({url: "http://.crunchyroll" + tld + "/", name: "sess_id", value: xhr.responseText});
		}
	}
	xhr.open("GET", "http://www.crunblocker.com/sess_id.php", true);
	xhr.send(null);
}

browser.browserAction.onClicked.addListener (function () {
	setCookie(".com");
	browser.tabs.create({url: "http://crunchyroll.com/videos/anime/"});
});

browser.runtime.onMessage.addListener(function (message) { 
	setCookie (message.msg); 
});

browser.runtime.onStartup.addListener(function () {
	setCookie (".com");
});