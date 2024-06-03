const swaggerAutogen = require('swagger-autogen');

const doc = {
	info: {
		title: 'My student API',
		description: 'An API that shows students data.',
	},
	// host: 'node-routes-xs4z.onrender.com',
	host: 'https://m4pnjsapi.onrender.com/',
	schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);

swaggerAutogen(outputFile, endpointFiles, doc).then(async () => {
	await import('./server.js');
});
