
var fileName = 'button.ru.md'
	fs = require('fs'),
	inData = fs.readFileSync('./in/' + fileName, 'utf-8');

exports.inData = inData;
