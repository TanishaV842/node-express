const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const campsiteRouter = require('./routes/campsiteRouter');
const partnerRouter = require('./routes/partnerRouter');
const promotionRouter = require('./routes/promotionRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/campsites', campsiteRouter);
app.use('/partners', partnerRouter);
app.use('/promotions', promotionRouter);

campsiteRouter.route('/campsites')
 .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
    })
 .get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})

.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})

.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
})

.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

partnerRouter.route('/partners')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
    })
 .get('/partners/:partnerId', (req, res) => {
    res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
})

.post('/partners/:partnerId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
})

.put('/partners/:partnerId', (req, res) => {
    res.write(`Updating the partner: ${req.params.partnerId}\n`);
    res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description}`);
})

.delete('/partners/:partnerId', (req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
});

promotionRouter.route('/promotions')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
    })
 .get('/promotions/:promotionId', (req, res) => {
    res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
})

.post('/promotions/:promotionId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})

.put('/promotions/:promotionId', (req, res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}`);
})

.delete('/promotions/:promotionId', (req, res) => {
    res.end(`Deleting promotion: ${req.params.promotionId}`);
});




app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
