

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var {Pool} = require('pg');

var app = express();

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));

app.use(bodyParser.json());
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/salesforce';


const client = new Pool({
	connectionString
  });


var propertyTable = 'property__c';
var favoriteTable = 'favorite__c';
var brokerTable = 'broker__c';

// setup the demo data if needed
client.query('SELECT * FROM salesforce.broker__c', function(error, data) {
	console.log(error)
	if (error !== null) {
		client.query(`CREATE TABLE broker__c (
			id SERIAL NOT NULL,
			sfid CHARACTER VARYING(18) UNIQUE,
			name CHARACTER VARYING(80),
			email__c CHARACTER VARYING(80),
			phone__c CHARACTER VARYING(40),
			mobile_phone__c CHARACTER VARYING(40),
			title__c CHARACTER VARYING(30),
			picture__c CHARACTER VARYING(255)
		   );`);
		
		   client.query(`CREATE TABLE property__c (
			id SERIAL NOT NULL,
			sfid CHARACTER VARYING(18) UNIQUE,
			name CHARACTER VARYING(80),
			thumbnail__c CHARACTER VARYING(255),
			beds__c DOUBLE PRECISION,
			address__c CHARACTER VARYING(100),
			baths__c DOUBLE PRECISION,
			broker__c CHARACTER VARYING(18) REFERENCES broker__c(sfid),
			description__c CHARACTER VARYING(500),
			state__c CHARACTER VARYING(20),
			city__c CHARACTER VARYING(50),
			zip__c CHARACTER VARYING(10),
			title__c CHARACTER VARYING(100),
			picture__c CHARACTER VARYING(255),
			price__c DOUBLE PRECISION,
			location__longitude__s DOUBLE PRECISION,
			location__latitude__s DOUBLE PRECISION
		   );`);
		
		   client.query(`CREATE TABLE favorite__c (
			id SERIAL NOT NULL,
			sfid CHARACTER VARYING(18) UNIQUE,
			property__c CHARACTER VARYING(18) REFERENCES property__c(sfid)
		   );`);
		   
		client.query('SELECT * FROM broker__c', function(error, data) {
		  if (error !== null) {
			console.log('Loading Demo Data...');
			require('./db/index.js')(client);
			console.log('Done Loading Demo Data!');
		  }
		});
	  }
	  else {
		var schema = 'salesforce.';
		propertyTable = schema + 'property__c';
		favoriteTable = schema + 'favorite__c';
		brokerTable = schema + 'broker__c';
	  }
});


app.get('/property', function(req, res) {
	client.query('SELECT * FROM ' + propertyTable, function(error, data) {
		res.json(data.rows);
	});
});

app.get('/property/:id', function(req, res) {
	client.query(
		'SELECT ' +
			propertyTable +
			'.*, ' +
			brokerTable +
			'.sfid AS broker__c_sfid, ' +
			brokerTable +
			'.name AS broker__c_name, ' +
			brokerTable +
			'.email__c AS broker__c_email__c, ' +
			brokerTable +
			'.phone__c AS broker__c_phone__c, ' +
			brokerTable +
			'.mobile_phone__c AS broker__c_mobile_phone__c, ' +
			brokerTable +
			'.title__c AS broker__c_title__c, ' +
			brokerTable +
			'.picture__c AS broker__c_picture__c FROM ' +
			propertyTable +
			' INNER JOIN ' +
			brokerTable +
			' ON ' +
			propertyTable +
			'.broker__c = ' +
			brokerTable +
			'.sfid WHERE ' +
			propertyTable +
			'.sfid = $1',
		[req.params.id],
		function(error, data) {
			res.json(data.rows[0]);
		}
	);
});

app.get('/favorite', function(req, res) {
	client.query(
		'SELECT ' +
			propertyTable +
			'.*, ' +
			favoriteTable +
			'.sfid AS favorite__c_sfid FROM ' +
			propertyTable +
			', ' +
			favoriteTable +
			' WHERE ' +
			propertyTable +
			'.sfid = ' +
			favoriteTable +
			'.property__c',
		function(error, data) {
			res.json(data.rows);
		}
	);
});

app.post('/favorite', function(req, res) {
	client.query('INSERT INTO ' + favoriteTable + ' (property__c) VALUES ($1)', [req.body.property__c], function(
		error,
		data
	) {
		res.json(data);
	});
});

app.delete('/favorite/:sfid', function(req, res) {
	client.query('DELETE FROM ' + favoriteTable + 'WHERE sfid = ($1)' , [req.params.sfid], function(error, data) {
		res.json(data);
	});
});

app.get('/broker', function(req, res) {
	client.query('SELECT * FROM ' + brokerTable, function(error, data) {
		res.json(data.rows);
	});
});

app.get('/broker/:sfid', function(req, res) {
	client.query('SELECT * FROM ' + brokerTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
		res.json(data.rows[0]);
	});
});

var port = process.env.PORT || 8080;

app.listen(port);

//console.log('Listening at: http://localhost:' + port);
