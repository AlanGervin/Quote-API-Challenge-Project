const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT);

const quotesRouter = express.Router();

app.use('/api/quotes', quotesRouter);

quotesRouter.get('/random',(req,res,next) => {
    let randomQuote = getRandomElement(quotes);
    const sendback = {"quote":randomQuote};
    res.send(sendback);
});

quotesRouter.get('/', (req,res,next) => {
    const person = req.query.person;
    if (person)  {
        returnArr = quotes.filter(quote => {
          return quote.person === person;
        });
        res.send({"quotes":returnArr});
    } else {
        const quotesResponse = {'quotes':quotes};
        res.send(quotesResponse);
    }
});

quotesRouter.post('/', (req,res,next) => {
  if (!req.query.quote && !req.query.person) {
      res.status(400).send();
  } else {
      const person = req.query.person;
      const quote = req.query.quote;
      quotes.push({"person":person,"quote":quote});
      res.send({"quote":{"person":person,"quote":quote}});
  }
});