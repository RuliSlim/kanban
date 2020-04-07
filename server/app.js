require('dotenv').config();
const express     = require('express');
const app         = express();
const cors        = require('cors');
const PORT        = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(require('./routes'));
app.use(require('./middlewares').errorHandler)

app.listen(PORT, () => console.log('Server listening on port ' + PORT));