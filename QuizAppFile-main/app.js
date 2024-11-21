const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Set the views directory
app.use(express.static('public')); // to serve CSS, JS, images, etc.

app.use(bodyParser.json());
app.get('/', (req, res) => {
  console.log('home');
  res.render('home'); 
});

app.get('/quiz', async (req, res) => {
  try {
    
    
    
    res.render('quiz'); 
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).send('Error fetching questions');
  }
});


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});