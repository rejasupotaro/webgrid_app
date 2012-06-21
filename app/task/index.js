var GridProject = require('./gridProject')
var gridProject = new GridProject()

module.exports = function() {
	gridProject.createProject("testProject", function(collection) {

		var primaryTest = function() {
			var args = arguments[0];
			var result = new Array();

			for (var i = 0; i < args.length; i++) {
				var num = args[i];
				var flag = true;
				var limit = Math.sqrt(num);
				for (var j = 2; j <= limit; j++) {
					if (num % j == 0) {
						flag = false;
						break;
					}
				}
				if (flag) {
					result.push(num);
				}
			}
			//log("task is done!!");
			//log(result);
			return result;
		}

		//var dataNum = 10000000;
		//var range =   100;
		var dataNum = 1000;
		var range = 100;
		for (var i = 0; i < dataNum / range; i++) {
			var args = new Array();
			for (var j = 0; j < range; j++) {
				var n = i * range + j;
				if (n != 0 && n != 1 && n != 2) {
					args.push(n);
				}
			}
			gridProject.addTask(collection, primaryTest, args);
		}
	})
}
