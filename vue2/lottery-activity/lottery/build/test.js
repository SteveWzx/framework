var path = require('path')
var fs = require('fs')

var dealSomingAsync = function(fromPath, reg, toPath) {
   var files = fs.readdirSync(fromPath);
   files.forEach(function(item) {
   	if (reg.test(item)) {
   		console.log(item)
   		var str = fs.readFileSync(fromPath + '/' + item, 'utf-8');
   		fs.writeFile(toPath + '/' + item, str, function(err) {
	       err ? console.log('write fail: ' + err) : console.log(item + " write success!")
	    });
   	}
   })
}

dealSomingAsync(path.resolve(__dirname, '../dist/'), /index.html/, path.resolve(__dirname, '../../../../svn/webapp/webapp/templates/activity/'))
dealSomingAsync(path.resolve(__dirname, '../dist/js/'), /\.js$/, path.resolve(__dirname, '../../../../jzb_release/lottery/js/'))
dealSomingAsync(path.resolve(__dirname, '../dist/css/'), /\.css$/, path.resolve(__dirname, '../../../../jzb_release/lottery/css/'))