function setCookie (tld) {
	fetch('https://cr.onestay.moe/getId')
	// the server should return an object with a value "sessionId" which is a string containing the session id
	.then((res) => { 
		return res.json()
	})
	.then((res) => {
		// the script I'm using is giving me the session id with one space at the end. I don't know why but this should remove it
		let sessionId = res.sessionId.slice(0, -1);
		browser.cookies.remove({url: "http://crunchyroll" + tld + "/", name: "sess_id"});
		browser.cookies.set({url: "http://.crunchyroll" + tld + "/", name: "sess_id", value: sessionId});
	})
	.catch((e) => {
		browser.notification.create("", { type: "basic", title: "Crunchyroll Unblocker Error", message: `Crunchyroll Unblocker has encountered an error: ${e}`})
	});
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