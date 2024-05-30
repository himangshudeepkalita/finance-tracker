import express from 'express';
import FinancialRecordModel from '../schema/financial-record.js';

const router = express.Router();

router.get("/getAllByUserID/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const records = await FinancialRecordModel.find({ userId: userId});
        if(records.length === 0) {
            return res.status(404).send("No records found for the user.")
        }
        res.status(200).send(records);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new FinancialRecordModel(newRecordBody);
        const savedRecord = await newRecord.save();

        res.status(200).send(savedRecord);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;