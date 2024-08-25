const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Enable CORS
app.use(bodyParser.json());

// POST route to handle the main logic
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "john_doe_17091999"; // Example hardcoded value
    const email = "john@xyz.com";
    const roll_number = "ABCD123";
    let numbers = [];
    let alphabets = [];
    let highest_lowercase_alphabet = '';

    // Process the input data
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highest_lowercase_alphabet) {
                highest_lowercase_alphabet = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : []
    });
});

// GET route for operation_code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
