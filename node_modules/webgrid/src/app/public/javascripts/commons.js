var worker = new Worker('/javascripts/worker.js');
worker.onmessage = function(event) {
	console.log(event.data);
}

var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
  socket.on('message', function(message) {
    if (message.hasOwnProperty('contents')) {
      var contents = message.contents;
      var pageContainer = document.getElementById("page-container");
      pageContainer.innerHTML = contents;
    }
  });

	socket.on('task', function(task) {
		worker.postMessage(task);
	});
});

// 指定されたコンテンツをサーバーに要求する
function getContents(contents) {
  socket.emit('message', { page: contents });
	socket.emit('task');
}

function showProperties(obj) {
  var s = "";
  for (var i in obj) {
    s += i + ",";
  }
  s = s.substring(0, s.length - 1);
  console.log(s);
}
