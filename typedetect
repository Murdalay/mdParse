var util = require('util'),
	typeDetect = function(item){
		
		if (!item){
			utl.error('no item')
		}

		else if (typeof item === 'object' && item.constructor.name === 'RegExp'){
			console.log('type deteted as RegExp');			
			return 'RegExp'
		}

		else if (typeof item === 'object' && item.constructor.name === 'Object'){
			console.log('type deteted as ' + typeof item);			
			return 'object'
		}		
		
		else if (util.isArray(item)) {
			console.log('type deteted as Array:  ' + JSON.stringify(item));	
			return 'Object'
		}

		else if (typeof item === 'string' && item.constructor.name === 'String'){
			console.log('type deteted as ' + typeof item);	
			return 'String'
		}

		else if (Number.isNaN(item)){
			console.log('type deteted as NaN');	
			return 'NaN'
		}

		else if (typeof item === number){
			console.log('type deteted as ' + typeof item);	
			return 'Number'
		}
		
		else if (typeof item === undefined){
			console.log('type deteted as ' + typeof item);	
			return 'Undefined'
		} 	

		else if (typeof item === boolean){
			console.log('type deteted as ' + typeof item);	
			return 'Boolean'
		}	

		else if (typeof item === 'function'){
			console.log('type deteted as ' + typeof item);	
			return 'Function'
		}			

		else throw new TypeError('unsupported item type');


	};

exports.typeDetect = typeDetect;