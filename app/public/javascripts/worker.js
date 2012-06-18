onmessage = function(event) {
	var task = event.data;
	var taskId = task.taskId;
	var	func = task.func;
	var	args = task.args;

	var func = new Function('args', func.replace(/^.*{/m, '{'));
	var result = {
		taskId:taskId,
		result:func(args)
	}

  postMessage(result);
}
