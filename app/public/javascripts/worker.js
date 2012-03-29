onmessage = function(event) {
	var task = event.data;
	var	func = task.func;
	var	args = task.args;

	var func = new Function('args', func.replace(/^.*{/m, '{'));
	var result = func(args);

  postMessage(result);
}
