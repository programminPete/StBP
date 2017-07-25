/* Outputs the IMDB episode rank to excel
Format:
node server_table2json.js Show WebAdress
node server_table2json.js Dexter http://www.imdb.com/title/tt0773262/epdate
*/
var tabletojson = require('tabletojson');
var json2csv = require('json2csv');
var fs = require('fs');


//var url = 'http://en.wikipedia.org/wiki/List_of_countries_by_credit_rating';
// The wire: var url = 'http://www.imdb.com/title/tt0306414/epdate';
var url = 'http://www.imdb.com/title/tt0773262/epdate';
//url = String(process.argv[3])
tabletojson.convertUrl(url)
.then(function(tablesAsJson){
	var firstTable = tablesAsJson[0];
	json2csv({data: firstTable,
		fields: ['#', 'Episode', 'UserRating', 'UserVotes']
	}, function(err, csv){
		console.log(csv);
    fs.writeFile('epRank_.csv', csv, 'utf8', function(err){
      if(err){
        console.log('Some error occured');
      }else{
        console.log('It\'s saved!');
      }
    })
	});
});