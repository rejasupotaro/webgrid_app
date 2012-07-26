var TaskManager = require("../../node_modules/webgrid/lib/TaskManager")
var taskManager = new TaskManager()

module.exports.main = function() {
  /*
  // ブラウザで実行される処理
  function morphologicalAnalysis() {
    var args = arguments[0]

    function SimpleAnalyzer() {
      this.re = new RegExp
      this.re.compile("[一-龠々〆ヵヶ]+|[ぁ-ん]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+|[,.、。！!？?()（）「」『』]+|[ 　]+", "g")
      this.joshi = new RegExp
      this.joshi.compile("(でなければ|について|ならば|までを|までの|くらい|なのか|として|とは|なら|から|まで|して|だけ|より|ほど|など|って|では|は|で|を|の|が|に|へ|と|て)", "g")
    }

    SimpleAnalyzer.prototype.parse = function(str) {
      if (typeof(str) == "string") {
        var s = str.replace(this.joshi, "$1|")
        var ary = s.split("|");
        var result = []
        for (var i = 0; i < ary.length; i++) {
          var token = ary[i].match(this.re)
          if (token) {
            for (var n = 0; n < token.length; n++) {
              result.push(token[n])
            }   
          }   
        }   
        return result
      }
    }

    var str = args
    var simpleAnalyzer = new SimpleAnalyzer()
    var wordArray =  simpleAnalyzer.parse(str)

    var result = new Array() 
    for (var i = 0; i < wordArray.length; i++) {
      result.push(wordArray[i])
    }

    return result 
  }

  // ブラウザで実行される処理を登録する
  var users = ["rejasupotaro", "ainame"]
  for (var i = 0; i < users.length; i++) {
    taskManager.addTask(morphologicalAnalysis, users[i])
  }

  return this
  */


  function primaryTest() {
    var args = arguments[0]
    var result = new Array()

    for (var i = 0; i < args.length; i++) {
      var num = args[i]
      var flag = true
      var limit = Math.sqrt(num)
      for (var j = 2; j <= limit; j++) {
        if (num % j == 0) {
          flag = false
          break
        }
      }
      if (flag) {
        result.push(num)
      }
    }
    return result
  }

  //var dataNum = 10000000
  //var range =   100
  var dataNum = 100000
  var range = 100
  for (var i = 0; i < dataNum / range; i++) {
    var args = new Array();
    for (var j = 0; j < range; j++) {
      var n = i * range + j
      if (n != 0 && n != 1 && n != 2) {
        args.push(n);
      }
    }
    taskManager.addTask(primaryTest, args)
  }

  return this
}

module.exports.result = function(result) {
  console.log('\n---------------------')
  console.log(result.toString())
}
