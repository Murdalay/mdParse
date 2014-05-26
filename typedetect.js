var util = require('util'),
	
	typeArray = ['RegExp', 'Object', 'Array', 'String', 'NaN', 'Number', 'Undefined', 'Boolean', 'Function'],
	
	suppTypes = function(){
		return typeArray
	},

	typeDetect = function(item){
		

		if (typeof item === 'object' && item.constructor.name === 'RegExp'){
		//	console.log('type deteted as RegExp');			
			return 'RegExp'
		}

		else if (typeof item === 'object' && item.constructor.name === 'Object'){
		//	console.log('type deteted as ' + typeof item);			
			return 'Object'
		}		
		
		else if (util.isArray(item)) {
		//	console.log('type deteted as Array:  ' + JSON.stringify(item));	
			return 'Array'
		}

		else if (typeof item === 'string' && item.constructor.name === 'String'){
		//	console.log('type deteted as ' + typeof item);	
			return 'String'
		}

		else if (Number.isNaN(item)){
		//	console.log('type deteted as NaN');	
			return 'NaN'
		}

		else if (typeof item === 'number'){
		//	console.log('type deteted as ' + typeof item);	
			return 'Number'
		}
		
		else if (typeof item === 'undefined'){
		//	console.log('type deteted as ' + typeof item);	
			return 'Undefined'
		} 	

		else if (typeof item === 'boolean'){
		//	console.log('type deteted as ' + typeof item);	
			return 'Boolean'
		}	

		else if (typeof item === 'function'){
		//	console.log('type deteted as ' + typeof item);	
			return 'Function'
		}			

		else util.error('unsupported item type');


	};

exports.typeDetect = typeDetect;
exports.suppTypes = suppTypes;