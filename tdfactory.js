var typeArray = require('./typedetect').suppTypes(),
	detect = require('./typedetect').typeDetect,
	util = require('util'),
	
	/**
	* @params {Object} 		Function specificator. Must contain a keys for different data types, 
	*						with callback function for the certian type in values.
	* @return {Function} 	Ready to use type-driven function.
	*/

	Factory = function(spec){

		var that = spec,
			counters = { elem : 0 },
			unsupported = [],
			res = [],

			
			_voidFunc = function(){},

			_summary = function(){
				util.log('Ther is no methods defined for the folowing types:\n' + unsupported);

				if (!that.isDef) {
					console.log(spec.def + '\nCustom function was set for that types.');
				}

				else {
					console.log('\rNo custom def function was provided. Default function are set for that types.');
				};

				console.log('\n\n' + counters.elem + ' element(s) processed.');
			},
			
			_setLog = function(){
				if (spec.log && spec.log === 'simple') {
					that.log = loggerSimple; 
				}

				else if (spec.log && spec.log === 'extended') {
					that.log = loggerExtended; 
				}

				that._summary = _summary
			},

			loggerSimple = function(arg){

				var sayOnce = function() {

					if (!counters.log) {
					console.log('\nSimple loging is on');
					counters.log = 1
					}

					else counters.log += 1;
				}
				
				sayOnce();

				if (arg) { util.log('\nlog #: ' + counters.log + ' ' + arg) }
			},

			loggerExtended = function(){

				var sayOnce = function() {

					if (!counters.log) {
					console.log('\nExtended loging is on');
					counters.log = 1
					}

					else counters.log += 1;
				}
				
				sayOnce();

				if (arg) { util.log('\nlog #: ' + counters.log + ' ' + arg) }	
			};

			spec.log ? _setLog() : that.log = that._summary = _voidFunc;
			
			




			return function(elem){

					var elemType = detect(elem),
						a, result = [],

						// default action for unsupported elem types

						_defAult = function(){ that.log('Unsupported elem type: ' + elemType + '\n')};
						

						if (spec.log) { that.log('Elem type is ' + elemType) };

						if (spec.def && detect(spec.def) === 'Function') { that.def = spec.def }

						else { that.def = _defAult; that.isDef = true };


						if (spec.runBefore && detect(spec.runBefore) === 'Function') { spec.runBefore() };


						// call the function, provided for the supported elem type

						typeArray.forEach(function(t, index){
							
							if (that.hasOwnProperty(t)) {
							
								if (that.hasOwnProperty(elemType) && elemType === t){

									that.log(
									 	'Index of chosen type in types array: [' + 
									 	index +
									// 	']\nand elem value is:\n' + 
									// 	elem + 
									 	'\n'
									 )
									
									counters.elem += 1; 
									result = that[elemType](elem);
								}
							}

							// forms the unsupported types array 

							else { unsupported.push(t) }
						});

						// envokes that.def() if current elem are of unsupported type

						unsupported.forEach(function(t, index){
							if (elemType === t) {
								that.def(elem)
							}
						});	

						// turn on summary display, if logging was enabled

						if (spec.log) { that._summary() };

						// run aditional functions if provided

						if (spec.runAfter && detect(spec.runAfter) === 'Function') { spec.runAfter() };


						unsupported = [];


						// returns result of current type function if any

						if (result > []) { that.log('\nSome result was returned\n\n'); return result }

			
			};
	};

exports.tdFactory = Factory;