import express from 'express';
import api from './api';

const app = express();

import './database';

app.set('port', process.env.PORT || 3002);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/api', api);

//Starting server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
