const express = require('express');
const cors = require('cors');
const mongoDB = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(cors()).use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.use(cors())
	.use(express.json())
	.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		next();
	})
	.use('/', require('./routes'));

mongoDB.initDB((err) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(PORT);
		console.log(
			'\x1b[34m%s\x1b[0m',
			`Connected to DB and listening on ${PORT}`
		);
	}
});
