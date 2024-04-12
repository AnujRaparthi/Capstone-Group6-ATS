const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authenticateToken'); 

router.put('/update', authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'address', 'gender'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;
