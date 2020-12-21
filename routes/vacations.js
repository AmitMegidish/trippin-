const router = require('express').Router();
const handleQuery = require('../db');
const verifyToken = require('../verifyToken');

//Get all Of the vacations. 
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const allVacationsQuery = `SELECT * FROM vacations;`;
        const followedVacationsQuery = `SELECT * FROM follow_up WHERE user_id = ${userId};`;
        const allVacations = await handleQuery(allVacationsQuery);
        const followedVacations = await handleQuery(followedVacationsQuery);

        const followedVacationsIndexes = followedVacations.map(vacation => vacation.vacation_id);

        allVacations.forEach(vacation => {
            followedVacationsIndexes.forEach(i => {
                if (vacation.id === i) {
                    vacation.isFollowed = true;
                }
            });
        });

        // Final response assemble.
        const followed = allVacations.filter(vacation => vacation.isFollowed);
        const unFollowed = allVacations.filter(vacation => !vacation.isFollowed);
        const vacations = [...followed, ...unFollowed];
        res.json(vacations);
    } catch (err) {
        res.json({ err: true, msg: err });
    }
});

// Admin only actions:
router.put('/edit/:id', async (req, res) => {
    try {
        const { city, country, vacationDescription, departureDate, returnDate, price, image } = req.body;
        if (!city || !country || !vacationDescription || !departureDate || !returnDate || !price || !image)
            return res.status(400).json({ err: true, msg: 'All fields are required!' });
        const updateVacationQuery = ` 
        UPDATE vacations
        SET city = '${city}', country = '${country}',vacation_description = '${vacationDescription}', departure_date = '${departureDate}', return_date= '${returnDate}', price = ${price},image = '${image}'
        WHERE id = ${req.params.id};`;
        await handleQuery(updateVacationQuery);
        res.status(200).json({ err: false, msg: 'Vacation updated successfully!' });
    } catch (err) {
        res.status(500).json({ err: true, msg: err });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { city, country, vacationDescription, departureDate, returnDate, price, image } = req.body;
        if (!city || !country || !vacationDescription || !departureDate || !returnDate || !price || !image)
            return res.status(400).json({ err: true, msg: "All fields are required!" });

        const addVacationQuery = `INSERT INTO vacations (city, country, vacation_description, departure_date, return_date, price, image)
        VALUES("${city}","${country}","${vacationDescription}","${departureDate}","${returnDate}",${price},"${image}");`;
        await handleQuery(addVacationQuery);
        res.status(201).json({ err: false, msg: "Vacation added successfully!" });
    } catch (err) {
        res.status(400).json({ err: true, msg: err });
    }
});

router.delete('/remove/:id', async (req, res) => {
    try {
        const vacationId = req.params.id;
        const removeFromFollowUpQuery = `DELETE FROM follow_up WHERE vacation_id = ${vacationId}`;
        await handleQuery(removeFromFollowUpQuery);
        const removeVacationQuery = `DELETE FROM vacations WHERE id = ${vacationId};`;
        await handleQuery(removeVacationQuery);
        res.status(200).json({ err: false, msg: 'Vacation removed successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: true, msg: err });
    }
});

module.exports = router;
