window.onload = function() {
  termOpen()
drawGraph()
}

var serverLoad = 0;

var worker = new Worker('/javascripts/worker.js')
worker.onmessage = function(event) {
	console.log(event.data)
	console.log(event.data.result)
	socket.emit('sendResult', event.data)
  requestTask()
}

var socket = io.connect('http://localhost:3000')

socket.on('connect', function() {
  socket.on('task', function(task) {
    worker.postMessage(task)
  })

  socket.on('view', function(view) {
    console.log(view)
    var pageContainer = document.getElementById('page-container')
    pageContainer.innerHTML = view
  })

  socket.on('info', function(info) {
    serverLoad = info.serverLoad
    console.log(info.serverLoad)
  })
})

// タスクをサーバーに要求する
function requestTask() {
  socket.emit('requestTask')
}

// 指定されたコンテンツをサーバーに要求する
function requestContents(view) {
  socket.emit('requestView', view)
}

// もろもろの情報をサーバーに要求する
function requestInfo() {
  socket.emit('requestInfo')
}

function drawGraph() {
  var n = 10
  var random = d3.random.normal(0, 0.1)
  var data = d3.range(n).map(function() { return 0 })
  
  var margin = {top: 10, right: 10, bottom: 20, left: 40},
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
  
  var x = d3.scale.linear()
      .domain([0, n - 1])
      .range([0, width]);
  
  var y = d3.scale.linear()
      .domain([0, 2])
      .range([height, 0]);

  var svg = d3.select("#progress").append("svg")
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
  
  var line = d3.svg.line()
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); })

  var path =
     svg.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line)
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  tick();
  
  function tick() {
    requestInfo()
    // push a new data point onto the back
    data.push(serverLoad);
  
    // redraw the line, and slide it to the left
    path
        .attr("d", line)
        .attr("transform", null)
      .transition()
        .duration(2000)
        .ease("linear")
        .attr("transform", "translate(" + x(-1) + ")")
        .each("end", tick);
  
    // pop the old data point off the front
    data.shift();
  }
}
