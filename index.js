const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const scoreRoutes = require('./routes/score-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
});

app.use('/api/scores', scoreRoutes);

mongoose.connection.on('connected', () => {
	console.log('Connected to Mongo Instance');
});

//Connection to local database
// mongoose
//   .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     app.listen(5000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Connection to MongoDB Atlas
mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.etqh6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
	)
	.then(() => {
		let port = process.env.PORT;
		if (port == null || port == '') {
			port = 5000;
		}
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});
