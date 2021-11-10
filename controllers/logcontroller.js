const Express = require("express");
const router = Express.Router();
let validatejWT = require("../middleware/validate-jwt");
const { LogModel } = require("../models");

router.get('/practice', validatejWT, (req, res) => {
    res.send('Practice Confirmed')
});

/*
=======================
    Log Create
=======================
*/
router.post("/", validatejWT, async (req, res) => {
    const { description, definition, result, } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch {
        res.status(500).json({ error: err });
    }
    //LogModel.create(logEntry)

});


/*
====================
    Get all Logs
====================
*/
router.get("/", async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
=======================
    Get Logs by User
=======================
*/
router.get("/:id", validatejWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
=============================
    Update Logs 
=============================
*/
router.put("/:id", validatejWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner: userId
        }
    };

    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    };

    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
===========================
    Delete a Log
===========================
*/
router.delete("/delete/:id", validatejWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({ message: "Log removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/about', (req, res) => {
    res.send("About Confirmed");
});

module.exports = router;