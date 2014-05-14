var data = require('./parsemd').parsed,
	fs = require('fs')
	jsn = JSON.stringify(data);
	console.log(jsn);

fs.writeFileSync('./out/result.json', jsn, 'utf-8');