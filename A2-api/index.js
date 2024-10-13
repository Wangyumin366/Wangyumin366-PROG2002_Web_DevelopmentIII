const express = require('express');
const cors = require('cors'); // Importing CORS to handle cross-origin requests
const app = express();
const port = 8080;
const getDBConnection = require('./crowdfunding_db');

app.use(cors());

// Get the database connection object
const dbConnection = getDBConnection();

// Get all categories
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM category';
  dbConnection.query(query, (error, rows) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('System error');
    }
    res.json(rows);
  });
});

// Get all active fundraisers
app.get('/fundraisers', (req, res) => {
  const query = `
        SELECT * FROM fundraiser 
        LEFT JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID 
        WHERE ACTIVE = True
    `;
  dbConnection.query(query, (error, rows) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('System error');
    }
    res.json(rows);
  });
});

// Search for fundraisers based on organizer, city, and category
app.get('/fundraisers/search', (req, res) => {
  const { ORGANIZER, CITY, CATEGORY_ID } = req.query;
  let query = `
        SELECT * FROM fundraiser 
        LEFT JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID 
        WHERE ACTIVE = True
    `;

  if (ORGANIZER) query += ` AND ORGANIZER = ?`;
  if (CITY) query += ` AND CITY = ?`;
  if (CATEGORY_ID) query += ` AND category.CATEGORY_ID = ?`;

  const params = [ORGANIZER, CITY, CATEGORY_ID].filter(param => param);

  dbConnection.query(query, params, (error, rows) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('System error');
    }
    res.json(rows);
  });
});

// Get a specific fundraiser by its ID
app.get('/fundraisers/:id', (req, res) => {
  const query = `
        SELECT * FROM fundraiser 
        LEFT JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID 
        WHERE FUNDRAISER_ID = ?
    `;
  dbConnection.query(query, [req.params.id], (error, rows) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('System error');
    }
    if (rows.length > 0) {
      res.json(rows[0]);
      return
    }

    res.status(404).send('Fundraiser not found');
  });
});

// Get fundraisers donations
app.get('/fundraisers/donations/:id', (req, res) => {
  const query = `
        SELECT * FROM donation 
        WHERE FUNDRAISER_ID = ?
    `;
  dbConnection.query(query, [req.params.id], (error, rows) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('System error');
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
