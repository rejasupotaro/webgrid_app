Array.prototype.indexOf = function (value) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == value) return i
  }
  return false 
}
Array.prototype.remove = function (value) {
  var index = this.indexOf(value)
  if (index) {
    this.splice(index, 1)
    return true
  }
  return false
}
Array.prototype.deepcopy = function () {
  var other = []
  for (var i = 0; i < this.length; i += 1) {
    var v = this[i]
    if (v.constructor == Array) {
      other[i] = v.deepcopy()
    } else {
      other[i] = v
    }
  }
  return other
}

var div = function (a, b) {
  return (a - (a % b)) / b
}

var init = function () {
  initInput()
  initSample()
}

var initInput = function () {
  // 何らかのソースを入れよう
  /*
  var sourceDiv = document.getElementById("source");
  var questionId = "question";
  var questionTable = createSudokuTable(questionId);
  sourceDiv.appendChild(questionTable);
  for (var i = 0; i < 9; i += 1) {
    for (var j = 0; j < 9; j += 1) {
      var cid = questionId + i + "" + j;
      var cell = document.getElementById(cid);
      var iid = "source" + i + "" + j;
      var input = document.createElement("input");
      input.id = iid;
      input.size = 1;
      cell.appendChild(input);
    }
  }
  */ 
};

var initSample = function () {
  var sample = [
    [8,0,7,
     0,6,0,
     5,0,1],
    [0,0,1,
     0,0,0,
     2,7,0],
    [0,0,3,
     0,9,0,
     6,0,0],
    
    [0,0,3,
     6,0,2,
     1,5,0],
    [5,0,0,
     0,0,8,
     3,0,0],
    [0,0,0,
     0,1,0,
     2,0,0],
    
    [9,0,0,
     0,0,0,
     4,7,0],
    [1,3,0,
     0,0,4,
     0,8,5],
    [8,0,6,
     9,5,7,
     0,0,2]
  ];
  setSample(sample);
};

var clearSample = function () {
  var sample = [
    [0,0,0,
     0,0,0,
     0,0,0],
    [0,0,0,
     0,0,0,
     0,0,0],
    [0,0,0,
     0,0,0,
     0,0,0],
    
    [0,0,0,
     0,0,0,
     0,0,0],
    [0,0,0,
     0,0,0,
     0,0,0],
    [0,0,0,
     0,0,0,
     0,0,0],
    
    [0,0,0,
     0,0,0,
     0,0,0],
    [0,0,0,
     0,0,0,
     0,0,0],
    [0,0,0,
     0,0,0,
     0,0,0]
  ];
  setSample(sample);
};

var setSample = function (sample) {
  // テーブルに値をセットする関数。つかわない
  /*
  var id = "source";
  for (var i = 0; i < 9; i += 1) {
    for (var j = 0; j < 9; j += 1) {
      var value = sample[i][j];
      var iid = id + i + "" + j;
      // var input = document.getElementById(iid);
      if (value == 0) {
        input.value = "";
      } else {
        input.value = "" + value;
      }
    }
  }
  */
};

var createSudokuTable = function (id) {
  var outTable = document.createElement("table");
  outTable.id = id;
  outTable.border = "1";
  var indexO = 0;
  for (var oRow = 0; oRow < 3; oRow += 1) {
    var outRow = outTable.insertRow(oRow);
    for (var oCol = 0; oCol < 3; oCol += 1) {
      var outCol = outRow.insertCell(oCol);
      var inTable = document.createElement("table");
      inTable.id = id + indexO;
      inTable.border = "1";
      var indexI = 0;
      for (var iRow = 0; iRow < 3; iRow += 1) {
        var inRow = inTable.insertRow(iRow);
        for (var iCol = 0; iCol < 3; iCol += 1) {
          var inCol = inRow.insertCell(iCol);
          var inDiv = document.createElement("div");
          inCol.appendChild(inDiv);
          inDiv.id = id + indexO + "" + indexI;
          //inDiv.innerHTML = "0";
          indexI += 1;
        }
      }
      outCol.appendChild(inTable);
      indexO += 1;
    }
  }
  return outTable;
};

var solve = function () {
  clearResult();
  var data = [];
  
  // var id = "source"; これじゃない
  for (var i = 0; i < 9; i += 1) {
    for (var j = 0; j < 9; j += 1) {
      var iid = id + i + "" + j;
      // var input = document.getElementById(iid); 対象のマスの数字は？
      var value = 0; // 何も入ってないとこは0で埋めるって感じ
      if (input.value.length > 0) { // 対象のマスに数字が入っていたら
        value = parseInt(input.value);
      }
      var x = (i % 3) * 3 + j % 3;
      var y = (div(i, 3)) * 3 + div(j, 3);
      var index = y * 9 + x;
      data[index] = value;
    }
  }
  solver(data);
};

var solver = function (data) {
  for (var i = 0; i < 81; i += 1) {
    if (data[i] != 0) continue;
    var t = [false,false,false,false,false,false,false,false,false,false];
    var iDivOs = div(i, 9);
    var iModOs = i % 9;
    var iDivOsIs = div(i, 27);
    var iModOsDivIs = div(i % 9, 3); 
    for (var j = 0; j < 81; j += 1) {
      if (div(j, 9) == iDivOs ||
          j % 9 == iModOs ||
          (div(j, 27) == iDivOsIs && div(j % 9, 3) == iModOsDivIs)) {
        t[data[j]] = true;
      }
    };
    for (var j = 1; j <= 9; j += 1) {
      if (t[j]) continue;
      data[i] = j;
      solver(data);
    }
    data[i] = 0;
    return;
  }
  showResult(data);
};

var resultCount = 0;

var showResult = function (data) {
  var resultDiv = document.getElementById("result");
  resultCount += 1;
  var resultId = "solution" + resultCount + "th";
  var resultTable = createSudokuTable(resultId);
  resultDiv.appendChild(resultTable);
  
  for (var i = 0; i < 81; i += 1) {
    var x = i % 9;
    var y = div(i, 9);
    var n = div(y, 3) * 3 + div(x, 3);
    var m = (y % 3) * 3 + x % 3;
    
    var cid = resultId + n + "" + m;
    var cell = document.getElementById(cid);
    var cellDiv = document.createElement("div");
    cellDiv.innerHTML = "" + data[i];
    cell.appendChild(cellDiv);
  }
};

var clearResult = function () {
  resultCount = 0;
  // 答えを表示するところを真っ白にする
  /*
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  */
};
