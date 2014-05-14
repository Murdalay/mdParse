var inData = require('./getdata').inData,
	specArray = require('./regexps').spec,
	state = {},
	type = require('./typedetect').typeDetect,
	util = require('util'),
	typeof = type,

	// _removeEmpty = function(arr){
	// 	util.isArray(arr) ? 
	// 	arr.forEach(
	// 		function(e, ind){
	// 			if (e === '' | !e) { arr.splice(ind, 1) }
	// 			else if (util.isArray(arr)) { _removeEmpty(e) }
	// 			else if (e.content) { _removeEmpty(e.content) }
	// 		}

	// 	) : return arr
	// 	return arr
	// },

    /**
     * Parse passed string using current state
     * @param {String} element to parse
     * @returns {String | Array} result
     */

	_parseMultiline = function(elem){
		var result = [],
			a, i, obj, lastIn = 0;
			
			if(!elem) {
				throw ('elem is undef')
			}

			else if (state.spec.ownMethod) { return state.spec.ownMethod(elem) }

			else if (elem && !state.spec.regExp.test(elem)){
				console.log('pattern not detected');
				return result = elem
			}
			
			else {

				while ((a = state.spec.regExp.exec(elem))) {
					var beforeTrigger = elem.slice(lastIn, state.spec.regExp.lastIndex - a[0].length);
					// 	for (i = 0; i < a.length; i += 1) {
					// 	console.log(state.spec.regExp.lastIndex + '[' + i + '] ' + a[i]);
					// };				
					obj = (function(){
						var preObj = {};
						preObj.block = state.spec.block;
						state.spec.fields.forEach(function(field, index){
							preObj[field] = a[index+1]					
						});
						console.log('preOBJECT is ' + JSON.stringify(preObj))
						
						return preObj
					}());

	
					if (beforeTrigger){
						console.log('beforeTrigger');
						result.push(beforeTrigger, obj)					
					}
	
					else if(obj){
						console.log('beforeTrigger is nothing to push. Pushing object');
						result.push(obj)	
					};
	
					lastIn = state.spec.regExp.lastIndex							
				};

				if (lastIn < elem.length && result) {
					result.push(elem.slice(lastIn))
					console.log("something left. I've pushed it");
				}
			};

			console.log('got it! ' + type(result));
			return result;
	},

	_typeDetect = function(item){
		
		if (!item){
			console.log('job is absent')
		}

		else if (item.content){
			console.log('type deteted as ' + typeof item);			
			item.content = _typeDetect(item.content);
			if (item.content){				
			return item
			}
		}
		
		else if (util.isArray(item) && item.length >= 1) {
			console.log('type deteted as Array:  ' + JSON.stringify(item));	
			return _arrayWalker(item)
		}

		else if (typeof item === 'string' && item.split){
			console.log('type deteted as ' + typeof item);	
			return _parseMultiline(item)
		};


	},

	 /**
     * Travers given array and call type detection for it elements. Can be called recursive.
     * @param {Array} array to traverse
     * @returns {Array} results
     */

	_arrayWalker = function(job){
		var result = [], chunk;

		if(util.isArray(job)) {
			console.log('\n\n\nTraversing array of ' + job.length + ' elements  ----------------------------------------------------------------------------------------');

			if (job.length === 1) {
				console.log('\nSingle element array detected!');

				result.push(_arrayWalker(job[0]))
			}

			else {
				job.forEach(
					function(elem, item){
						if (elem){
							console.log('\nProcessing item #: ' + item );
							chunk = _typeDetect(elem);
/*							console.log('result chunk is: ' + JSON.stringify(chunk)+ '\n\n');*/

							result.push(chunk)
						}			
					}
				);
			}
		}

		else { 
			console.log('yayks! It seems, that passed value is not an array...');
			result.push(_typeDetect(job)) 
		};

		console.log('IM ALIVE');
		return result
	};

// call parser for every regexp specificator

specArray.forEach(function(elem, i){
	state.spec = elem;
	state.data = inData;

	console.log('\n\n\n********************************************************************************');
	console.log('\nBlock name are set to: ' + state.spec.block);	
	console.log('\nRegexp is: ' + state.spec.regExp);
	console.log('\n********************************************************************************\n\n\n');
	

	state.data = _arrayWalker(state.data)
	
});


exports.parsed = state.data