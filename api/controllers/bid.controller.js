import Bid from "../models/bid.model.js";
import Tender from "../models/tender.model.js";

//create new bid
export const addBids = async (req, res) => {
    const { tenderId, companyName, bidCost, message } = req.body;
    try {
        const tender = await Tender.findById(tenderId);

        if (!tender) {
            return res.status(404).json({ msg: 'Tender not found' });
        }

        const now = new Date();
        let isLastFiveMinutes = false;
        if ((tender.endTime - now) <= 5 * 60 * 1000) {
            isLastFiveMinutes = true;
            tender.endTime = new Date(tender.endTime.getTime() + tender.bufferTime * 60000);
            await tender.save();
        }

        const newBid = new Bid({
            tenderId,
            companyName,
            bidCost,
            message,
            isLastFiveMinutes
        });

        const bid = await newBid.save();
        res.json(bid);
    } catch (err) {
        res.status(500).send('Server Error');
    }

};

//get all bids for tender
export const allBids = async (req, res) => {
    try {
        const bids = await Bid.find({ tenderId: req.params.tenderId }).sort({ bidCost: 1 });
        res.json(bids);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
