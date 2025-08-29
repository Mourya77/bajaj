// api/bfhl.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { data } = req.body || {};
        const full_name = "mourya_g";
        const dob = "01012000";
        const email = "your_email@vitbhopal.ac.in";
        const roll_number = "VITB-XXXX";

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];

        let sum = 0;
        let letters = "";

        const isNumeric = (s) => /^-?\d+$/.test(s);
        const isAlpha = (s) => /^[A-Za-z]+$/.test(s);

        if (Array.isArray(data)) {
            data.forEach((item) => {
                const str = String(item);
                if (isNumeric(str)) {
                    const num = parseInt(str, 10);
                    sum += num;
                    if (num % 2 === 0) even_numbers.push(str);
                    else odd_numbers.push(str);
                } else if (isAlpha(str)) {
                    alphabets.push(str.toUpperCase());
                    letters += str;
                } else {
                    special_characters.push(str);
                }
            });
        }

        const concat_string = letters
            .split("")
            .reverse()
            .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
            .join("");

        return res.status(200).json({
            is_success: true,
            user_id: `${full_name}_${dob}`,
            email,
            roll_number,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string,
        });
    }

    return res.status(405).json({ is_success: false, message: "Method Not Allowed" });
}
