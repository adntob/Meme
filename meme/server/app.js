const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const logger = require('morgan');

const indexRouter = require('./routes/index');

const db = require('./data/connections');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended:true,
  })
);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);






//GET

app.get('/memes', db.getAllMemes);
app.get('/memes/:id', db.getMemeById);

//POST
app.post('memes/', db.createMeme);

//DELETE
app.delete('memes/:id', db.deleteMeme);





// catch 404 and forward to error handler
app.use( (req, res, next)=> {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;