//acquiring file system
var fs = require('fs');
//acquiring readline
var readline = require('readline');
//acquiring stream
var stream = require('stream');
//acquring wink statistics
var reg = require('wink-statistics').streaming.slr;


var reg_age_weight = reg();
var instream = fs.createReadStream('regression.txt');
var line_index =1;


var rl = readline.createInterface(
{
    input: instream,
    terminal: false
});


rl.on('line', function(line) {
  	if(line_index>36)
    {
	 str = line;
	 var arr = str.split("  ").map(function (val) { return +val; });
	 reg_age_weight.compute(arr[3],arr[2]);
	}
	line_index++;
});

rl.on('close',function()
{
	console.log("reading data complete");
	console.log(reg_age_weight.result());
	reg_age_weight_obj =reg_age_weight.result();
	var age = 22;
	var prediction = (reg_age_weight_obj.slope*age)+reg_age_weight_obj.intercept;
	console.log(prediction);




});