// const express = require('express');
// const bodyParser = require('body-parser')
// const os = require('os');
// const db = require('./queries')
// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended:true,
// }));
// app.use(express.static('dist'));

// app.get('/brokers', db.getBrokers)
// app.get('/properties', db.getProperties)
// app.get('/favorites', db.getFavories)
// app.get('/', (request, response) => {
//     response.json({ info: 'Node.js, Express, and Postgres API' })
//   })

// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();
const Pool = pg.Pool;

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));

app.use(bodyParser.json());

//var connectionString = 'postgres://localhost:5432/salesforce';

//var client = new pg.Client(connectionString);
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:test1234@localhost:5432/salesforce';

// const client = new Pool({
// 	user: 'postgres',
// 	host: 'localhost',
// 	database: 'salesforce',
// 	password: 'test1234',
// 	port: 5432
// });
var client = new pg.Client(connectionString);

client.connect();

var propertyTable = 'property__c';
var favoriteTable = 'favorite__c';
var brokerTable = 'broker__c';

// setup the demo data if needed
client.query('SELECT * FROM salesforce.broker__c', function(error, data) {
	if (error === null) {
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
	client.query('DELETE FROM ' + favoriteTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
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

var port = 8080;

app.listen(port);

//console.log('Listening at: http://localhost:' + port);
