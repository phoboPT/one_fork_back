const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require("cors");
const cookieSession = require('cookie-session');
//Database
const db = require('./config/database')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
)

app.set('trust proxy', 1)
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.get('/', (req, res) => res.send('INDEX'));
//group

app.use('/api/users', require('./routes/user'))
app.use('/api/restaurant', require('./routes/restaurant'))
app.use('/api/table', require('./routes/table'))
app.use('/api/restaurantType', require('./routes/restaurantType'))
app.use('/api/productType', require('./routes/productType'))


console.log(process.env.JWT_SECRET)


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port http://127.0.0.1:${PORT}`))
