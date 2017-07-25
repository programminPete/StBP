/* Outputs the IMDB episode rating to excel
Format:
node server_table2json.js Show WebAdress
node server_table2json.js Dexter http://www.imdb.com/title/tt0773262/epdate\

// TODO: add if statement so operator can just enter the show's "tt0" number, and it will 
// automatically go to the main IMDB page to pull general info, and then go to the 
// '/epdate' page to pull the episode specific info

// TODO: Format scraped data into appealing format.
*/

/* ---- Required Packages ---- */
var tabletojson = require('tabletojson');
var json2csv = require('json2csv');
var fs = require('fs');


// The wire: var url = 'http://www.imdb.com/title/tt0306414/epdate';
/* ---- argv ---- */
// Allow user to enter file name in command prompt
if (process.argv[2].length >0){
  var excelName = 'epRank_'+process.argv[2]+'.csv';
}else{		// else enter the save location manually here
  var excelName = 'epRank_ParksAndRec.csv'
}
// Allow user to enter IMDB web address in command prompt
if (process.argv[3].length >0){
  var url = process.argv[3];
} else{		// else enter the webaddress location manually here
  var url = 'http://www.imdb.com/title/tt0773262/epdate';
}
//url = String(process.argv[3])
tabletojson.convertUrl(url)
.then(function(tablesAsJson){
	var firstTable = tablesAsJson[0];
	json2csv({data: firstTable,
		// parse table for following columns
		fields: ['#', 'Episode', 'UserRating', 'UserVotes']
	}, function(err, csv){
    console.log(csv);
	// write excel (csv) file to Rated shows folder, with show extension name
    fs.writeFile('RatedShows/'+excelName, csv, 'utf8', function(err){

      if(err){
        console.log('Some error occured');
      }else{
        console.log('It\'s saved!');
      }
    })
	});
});