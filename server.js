const express = require('express');
const bodyParser = require('body-parser');
const { callManager} = require('./callManager');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.post('/answer', (req, res) => {
  callManager.createCall(req.body.uuid);
  const ncco = callManager.getNcco(req.body.uuid);
  res.json(ncco);
});

app.post('/dtmf', (req, res) => {
  callManager.updateCall(req.body.uuid, `DTMF-${req.body.dtmf}`);
  const ncco = callManager.getNcco(req.body.uuid);
  res.json(ncco);
});

app.post('/event', (req, res) => {
  if(req.body.status === 'completed') {
    callManager.endCall(req.body.uuid);
  }
  res.json({ status: 'OK' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
