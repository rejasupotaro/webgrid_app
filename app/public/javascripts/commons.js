var worker = new Worker('/javascripts/worker.js');
worker.onmessage = function(event) {
	console.log(event.data);
	socket.emit('result', event.data);
}

var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
  socket.on('task', receiveTask)
  socket.on('message', receiveContents)
});

// タスクをサーバーに要求する
function requestTask() {
  socket.emit('task')
}
function receiveTask(task) {
  setTimeout(function() {
    worker.postMessage(task)
  }, 1000)
}

// 指定されたコンテンツをサーバーに要求する
function requestContents(contents) {
  socket.emit('message', { page: contents })
	socket.emit('task')
}
function receiveContents(message) {
  if (message.hasOwnProperty('contents')) {
    var contents = message.contents;
    var pageContainer = document.getElementById("page-container");
    pageContainer.innerHTML = contents;
  }
}

// プロジェクトの情報をサーバーに要求する
function requestProjectInfo() {
  socket.emit('projectInfo')
}
function receiveProjectInfo() {
  
}

function drawGraph() {
  var n = 40,
      random = d3.random.normal(0, .2),
      data = d3.range(n).map(random);
  
  var margin = {top: 10, right: 10, bottom: 20, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
  var x = d3.scale.linear()
      .domain([0, n - 1])
      .range([0, width]);
  
  var y = d3.scale.linear()
      .domain([-1, 1])
      .range([height, 0]);
  
  var line = d3.svg.line()
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); });
  
  var svg = d3.select("#projectInfoGraph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);
  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis().scale(x).orient("bottom"));
  
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"));
  
  var path = svg.append("g")
      .attr("clip-path", "url(#clip)")
    .append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);
  
  tick();
  
  function tick() {
    // push a new data point onto the back
    data.push(random());
  
    // redraw the line, and slide it to the left
    path
        .attr("d", line)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", "translate(" + x(-1) + ")")
        .each("end", tick);
  
    // pop the old data point off the front
    data.shift();
  }
}
