var worker = new Worker('/javascripts/background.js')

worker.receiveTask = function(task) {
  worker.postMessage(task)
}

worker.onmessage = function(event) {

  taskPoint += event.data.result.length
	console.log(event.data.result)

  // サーバーに処理結果を送信する
	socket.emit('sendResult', event.data)

  // 再びサーバーにタスクを要求する
  requestTask()
}
