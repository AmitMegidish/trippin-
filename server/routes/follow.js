const router = require('express').Router();
const handleQuery = require('../db');

router.get('/reports', async (req, res) => {
    try {
        const followedVacationsQuery = `SELECT * FROM vacations WHERE number_of_followers > 0;`;
        const vacations = await handleQuery(followedVacationsQuery);
        res.json(vacations);
    } catch (err) {
        res.json({ err: true, msg: err });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { userId, vacationId } = req.body;
        if (!userId || !vacationId)
            return res.status(401).json({ error: true, msg: 'Missing information' });

        const addVacationQuery = `
        INSERT INTO follow_up (user_id, vacation_id)
        VALUES(${userId},${vacationId});`;

        const updateVacationQuery = `
        UPDATE vacations 
        SET number_of_followers = number_of_followers + 1 
        WHERE id = ${vacationId};`;

        await handleQuery(addVacationQuery);
        await handleQuery(updateVacationQuery);
        res.status(200).json({ err: false, msg: "Vacation is now being followed!" });
    } catch (err) {
        res.status(500).json({ err: true, msg: `Ooops! something went WRONG.` });
    }
});

router.delete('/remove', async (req, res) => {
    try {
        const { userId, vacationId } = req.body;
        if (!userId || !vacationId)
            return res.status(401).json({ err: true, msg: 'Missing information' });
        const removeVacationQuery = `DELETE FROM follow_up WHERE user_id=${userId} AND vacation_id=${vacationId};`;
        const updateVacationQuery = `
        UPDATE vacations 
        SET number_of_followers = number_of_followers - 1 
        WHERE id = ${vacationId};`;
        await handleQuery(removeVacationQuery);
        await handleQuery(updateVacationQuery);
        res.status(200).json({ err: false, msg: "Vacation is now unfollowed!" });
    } catch (err) {
        res.status(500).json({ err: true, msg: `Ooops! something went WRONG.` });
    }
});

module.exports = router;

