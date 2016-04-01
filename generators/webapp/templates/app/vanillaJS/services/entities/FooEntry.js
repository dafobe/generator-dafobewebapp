
function FooEntry(param1, param2){
	this.param1 = param1;
	this.param2 = param2;
}

FooEntry.prototype.getParam1 = function (){
	return this.param1;
}