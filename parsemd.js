var inData = require('./getdata').inData,
	specArray = require('./regexps').spec,
	state = {},
	type = require('./typedetect').typeDetect,
	util = require('util'),
	factory = require('./tdfactory').tdFactory,


	parserObj = { 

		'String' : function(elem){
			var result = [],
				a, i, obj, lastIn = 0;
				

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
							console.log("I'VE MAKE SOME OBJECTS")

							return preObj
						}());

		
						if (beforeTrigger){
							result.push(beforeTrigger, obj)					
						}
		
						else if(obj){
							result.push(obj)	
						}

						lastIn = state.spec.regExp.lastIndex							
					}
		
				};

					if (lastIn < elem.length && result) {
						result.push(elem.slice(lastIn));
						this.log("something left. I've pushed it");
					}
				

				this.log('got it! ');
				return result;
		},
		
		log : 'simple'
	},



	objObj = {

		'Object' : function(elem) {

			if (elem && elem.content){
				this.log('type deteted as ' + typeof item);			
				elem.content = router(elem.content);
				
				return elem
			}

		},

		def : function(elem) { return router(elem) },
		log : 'simple'
	},

	arrayObj = {

		'Array' : function(elem){
		
			return elem.map(function (e) { return router(e) })
	},
	
	def : function(elem) { return router(elem) },
	log : 'simple'
	},


	parseObject = factory(objObj),

	walkArray = factory(arrayObj),

	parseStrings = factory(parserObj),

	routerObj = {

		'String' : function(elem) {  return parseStrings(elem) },

		'Object' : function(elem) { return parseObject(elem) },

		'Array' : function(elem) { return walkArray(elem) },



		log : 'simple'
	},

	router = factory(routerObj);
	
	console.log(state.data);


// call parser for every regexp specificator

specArray.forEach(function(elem, i){
	state.spec = elem;

	
	if (!state.data) {

		state.data = router(inData)
	};

	console.log('\n\n\n********************************************************************************');
	console.log('\nBlock name are set to: ' + state.spec.block);	
	console.log('\nRegexp is: ' + state.spec.regExp);
	console.log('\n********************************************************************************\n\n\n');
	

	state.data = router(state.data);
	
});
	


// var test = {
// 	'Number' : function(arg){ console.log('It works! ' + arg) },
// 	'NaN'	: function(){ this.log(this); },
// 	'Boolean' : function(){ this.log(this); },
// 	'runBefore' : function(){ this.log('kva'); },
// 	//'def' : function(){ this.log(this); },
// 	log : 'simple'
// 	},

// testFactory = factory(test);

// testFactory('sdsd');



exports.parsed = state.data