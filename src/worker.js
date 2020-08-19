const port = 3005;
const io = require('socket.io-client');
const server = `http://localhost:${port}`;
console.log(`Injector loaded. Connecting to server at ${port}...`);
const socket = io.connect(server);
socket.on('connect', async () => {
	console.log(`Connected! Waiting for updates.`);

	if (window.location.href.indexOf('editlive') !== -1) {
		try {
			let selector = decodeURI(window.location.href.split('?')[1].split('&').filter(el => el.match(/editlive/))[0].split('=')[1]);
			let html = $(selector).html();
			if (html) {
				html = `<!-- selector: "${selector}" -->\n` + html;
			}
			console.log(`Emitting ${html.length} bytes of html`);
			socket.emit('edit', html);
		} catch (err) {
			alert(`Invalid or empty selector`);
			console.log(err);
		}
	}

	socket.on('update', (data) => {
		console.log(`Received ${data.html.length} bytes of code! Injecting... `);
		let selector = data.html.match(/<!-- selector: "(.+?)" -->/);
		let remove = data.html.match(/<!-- remove: "(.+?)" -->/);
		if (remove) {
			$(remove[1]).remove();
		}
		if (selector) {
			$(`${selector[1] ? selector[1] : '.site-page'}`).html(data.html);
		} else {
			console.log(`No selector provided`);
		}
	});

})