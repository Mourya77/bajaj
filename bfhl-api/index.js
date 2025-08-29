const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const FULL_NAME = (process.env.FULL_NAME || 'mourya_g').toLowerCase();
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || '01011004';
const EMAIL = process.env.EMAIL || 'gunupurumourya2022@vitbhopal.ac.in';
const ROLL_NUMBER = process.env.ROLL_NUMBER || 'VITB-2026';

const isNumericString = (s) => typeof s === 'string' && /^-?\d+$/.test(s);
const isAlphaString = (s) => typeof s === 'string' && /^[A-Za-z]+$/.test(s);
const extractLetters = (s) => (typeof s === 'string' ? s : String(s)).replace(/[^A-Za-z]/g, '');
const altCapsReverse = (letters) => letters
    .split('')
    .reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');

app.post('/bfhl', (req, res) => {
    const { data } = req.body || {};

    const base = {
        is_success: false,
        user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER
    };

    if (!Array.isArray(data)) {
        return res.status(400).json({ ...base, error: 'Invalid payload: "data" must be an array.' });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    let allLetters = '';

    for (const token of data) {
        const s = typeof token === 'string' ? token : String(token);
        allLetters += extractLetters(s);

        if (isNumericString(s)) {
            // keep numbers AS STRINGS in output
            const n = parseInt(s, 10);
            (Math.abs(n) % 2 === 0 ? even_numbers : odd_numbers).push(s);
            sum += n;
        } else if (isAlphaString(s)) {
            alphabets.push(s.toUpperCase());
        } else {
            if (s.length) special_characters.push(s);
        }
    }

    const concat_string = altCapsReverse(allLetters);

    return res.status(200).json({
        ...base,
        is_success: true,
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: String(sum),
        concat_string
    });
});

app.get('/', (_req, res) => res.send('OK'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BFHL API listening on :${PORT}`));
