var regexps = {
	code : /(`{3,})([^\n\r\f]{0,})[\n\r]([^`]{1,})`{3,}/g,

	link : /\[([^\]\n\r\f]{1,})\]\(([^\)\]\n\r\f]{1,})\)/g,

	header : /(#{1,})([^\n\r\f#]{1,})/g
};

var spec = [
	{
		block : 'code',

		regExp : /(`{3,})([^\n\r\f]{0,})[\n\r]([^`]{1,})`{3,}/g,

		fields : ['group1', 'type', 'content'],

		mutable : false


	},
	{
		block : 'header',

		regExp : /(?:[\n\r]{1,}|[DSW])(#{1,})\u0020{0,1}([^\n\r\f#]{1,})(?:[.\u0020]{0,})/g,

		fields : ['level', 'content'],

		mutable : true


	},	
	{
		block : 'link',

		regExp : /\[([^\]\[\n\r]{1,})\]\(([^\n\)]{1,})\)/g,

		fields : ['content', 'url'],

		mutable : false


	},	
	{
		block : 'paragraph',

		regExp : 'has own method',

		fields : ['content'],

		mutable : true,

		ownMethod : function(elem){
			var temp, res = [];
			if (!/\n{2,}/.test(elem)) { return elem }
			
			else {				
				temp = elem.split(/\n{2,}/);
				temp.forEach(function(part){
					var preObj = {};
	
					if (part){
						preObj.block = 'paragraph';
						preObj.content = part;
						res.push(preObj)
					}


				})
				return res
			}
		}
	}

];



exports.regexps = regexps;
exports.spec = spec;