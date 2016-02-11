
/**
 * 
 * Singleton module to manage App business logic
 * 
 * 
 * */

function MainService(FooEntry) {
	'use strict';
	var foo,
		bar,
		datasource = 'https://demo3417391.mockable.io';
		
	var _getFooEntry = function(){
		return this.foo;
	}
	
	var _setFooEntry = function(params){
		this.foo = new FooEntry(params);
	}
	
	//Public API
	return {
		getFooEntry: _getFooEntry,
		setFooEntry: _setFooEntry
	};
}