const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const cors = require('cors');
const bodyParser = require('body-parser');
// require('./models/Label');
// require('./models/Project');
// require('./models/Task');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/projectRoutes')(app)
require('./routes/taskRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  const path = require('path');
  // like our main.js file, or main.css file!
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  // });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);