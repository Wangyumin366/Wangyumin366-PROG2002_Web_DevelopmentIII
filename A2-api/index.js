const express = require('express');
const path = require('path');
const cors = require('cors'); // Importing CORS to handle cross-origin requests
const app = express();
const port = 8080;
const getDBConnection = require('./crowdfunding_db');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'browser')));

// Get the database connection object
const dbConnection = getDBConnection();

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

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

// Get all fundraisers
app.get('/admin/fundraisers', (req, res) => {
  const query = `
        SELECT * FROM fundraiser 
        LEFT JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID
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

// Insert a new fundraisers donation
app.post('/fundraisers/donations', (req, res) => {
  const { AMOUNT, GIVER, FUNDRAISER_ID } = req.body;

  if (!GIVER || !FUNDRAISER_ID) {
    res.status(400).json({ error: 'Amount or fundraiserId required.' })
    return
  }

  if (!isNumber(AMOUNT) || AMOUNT < 5) {
    res.status(400).json({ error: 'Amount is not correct format.' })
    return
  }

  const query = `
        INSERT INTO donation(DATE, AMOUNT, GIVER, FUNDRAISER_ID) 
        VALUES(?,?,?,?) 
    `;
  const date = new Date()
  dbConnection.query(query, [date, AMOUNT, GIVER, FUNDRAISER_ID], (error, rows) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('System error');
    }
    res.json(rows);
  });
});

// Insert a new fundraisers
app.post('/fundraisers', (req, res) => {
  const { ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE } = req.body;

  if (!ORGANIZER || !CAPTION || !CITY) {
    res.status(400).json({ error: 'Organizer or caption or city required.' })
    return
  }

  if (ACTIVE == null) {
    res.status(400).json({ error: 'Active required.' })
    return
  }

  if (!isNumber(TARGET_FUNDING) || TARGET_FUNDING <= 0) {
    res.status(400).json({ error: 'Target funding not correct format.' })
    return
  }

  if (!isNumber(CURRENT_FUNDING) || CURRENT_FUNDING < 0) {
    res.status(400).json({ error: 'Current funding not correct format.' })
    return
  }

  if (!isNumber(CATEGORY_ID)) {
    res.status(400).json({ error: 'CategoryId not correct format.' })
    return
  }

  const query = `
        INSERT INTO fundraiser(ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE) 
        VALUES(?,?,?,?,?,?,?) 
    `;

  dbConnection.query(query, [ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE], (error, rows) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('System error');
    }
    res.json(rows);
  });
});

// Update a new fundraisers
app.put('/fundraisers/:id', (req, res) => {
  const { ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE } = req.body;

  if (!ORGANIZER || !CAPTION || !CITY) {
    res.status(400).json({ error: 'Organizer or caption or city required.' })
    return
  }

  if (ACTIVE == null) {
    res.status(400).json({ error: 'Active required.' })
    return
  }

  if (!isNumber(TARGET_FUNDING) || TARGET_FUNDING <= 0) {
    res.status(400).json({ error: 'Target funding not correct format.' })
    return
  }

  if (!isNumber(CURRENT_FUNDING) || CURRENT_FUNDING < 0) {
    res.status(400).json({ error: 'Current funding not correct format.' })
    return
  }

  if (!isNumber(CATEGORY_ID)) {
    res.status(400).json({ error: 'CategoryId not correct format.' })
    return
  }

  const query = `
        UPDATE fundraiser
        SET ORGANIZER = ?, 
            CAPTION = ?, 
            TARGET_FUNDING = ?, 
            CURRENT_FUNDING = ?, 
            CITY = ?, 
            CATEGORY_ID = ?, 
            ACTIVE = ?
        WHERE FUNDRAISER_ID = ?;
    `;

  dbConnection.query(query, [ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE, req.params.id], (error, rows) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('System error');
    }
    res.json(rows);
  });
});

// Get a specific fundraiser by its ID
app.delete('/fundraisers/:id', (req, res) => {
  const query = `
        DELETE FROM fundraiser 
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "browser", "index.html"));
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
