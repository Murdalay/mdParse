var inData = require('./getdata').inData,
	specArray = require('./regexps').spec,
	state = {},
	type = require('./typedetect').typeDetect,
	util = require('util'),
	factory = require('./tdfactory').tdFactory,
	procData = [],
	stringsArray = [],
	currPrefix,
	currAdress,


	parserObj = { 

		'String' : function(elem){
			var result = [],
				a, i, obj, lastIn = 0;
				
				this.log('Original elem.length is ' + elem.length);
				
				if (state.spec && state.spec.ownMethod) { return state.spec.ownMethod(elem) }

				else if (state.spec && !state.spec.regExp.test(elem)){
					this.log('pattern not detected');
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
							console.log("I'VE MAKE SOME OBJECTS and lastIn is " + state.spec.regExp.lastIndex)

							return preObj
						}());
		
						if (beforeTrigger){
							result.push(beforeTrigger, obj)					
						}
		
						else if(obj){
							result.push(obj)	
						}

						lastIn = state.spec.regExp.lastIndex							
					};
		
					if (lastIn > 0 && lastIn < elem.length && result) {
						result.push(elem.slice(lastIn));
						this.log("something left. I've pushed it. lastIn was " + lastIn + ' and elem.length was ' + elem.length);
					}
				};

				if (result && result > []){
					return result;
				}
		},
		
		log : 'simple'
	},

	parseStrings = factory(parserObj),


	stringDetect = function() { 
		console.log('tring to eval');

		 eval(currPrefix).forEach(function(e, i) {
			var eType =	type(e),
				adress, contType, oldPrefix;

				console.log('\nCurrent e type is ' + eType + ' and CurrPrefix is ' + currPrefix)	
				adress = currPrefix;

			if (eType === 'String'){
				if (e && state.spec && state.spec.regExp.test(e)){
					adress += '[' + i + ']';
					stringsArray.push(adress)
				}
			}

			else if (eType === 'Object'){
				contType = type(e.content);

				console.log('Object content value type detected as ' + contType);

				if (contType === 'String'){
					if (e.mutable  && state.spec.regExp.test(e.content)){
						adress += '[' + i + ']' + '.content';
						stringsArray.push(adress);
						console.log('Adress is ' + adress);
					}
				}

				else {
					oldPrefix = currPrefix;
					currPrefix += '[' + i + ']' + '.content';

					console.log('Recursively detecting nested object content\n');
					stringDetect();

					currPrefix = oldPrefix;

				}

			}

			else if (eType === 'Array'){

				oldPrefix = currPrefix;
				currPrefix += '[' + i + ']';

				console.log('Recursively detecting nested array content\n');
				stringDetect();

				currPrefix = oldPrefix;
			}

		})

	},


	//@ param {String} Start point array name

	detectMutableStrings = function(startPrefix){

		if (!startPrefix) { currPrefix = 'procData' }

		else { currPrefix = startPrefix };

		stringDetect()
	};


state.regexpCount = 0;

specArray.forEach(function(elem, i){

	state.spec = elem;

	console.log(state.regexpCount);
	if (state.regexpCount === 0) {
		state.regexpCount++

		return procData = parseStrings(inData);

	}

	else {  
		state.regexpCount++ 
		detectMutableStrings('procData');

		console.log('\n\n\n\nTHE ARRAY IS ' + stringsArray);

		stringsArray.forEach(function(e, i){
			console.log('\n' + e + '\n');
			var a = eval(e);

			a = parseStrings(a);

				console.log('\n\nCurrent a value before I try to push it is ' + a);
				eval(e + " = a")
			
		});

		stringsArray = []

	}

});


console.log('\n\n\n\nAnd the result is:\n\n' + JSON.stringify(procData));





exports.parsed = state.result
