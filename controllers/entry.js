const shortid = require('shortid');
const Entry = require('../models/entry');
const User = require('../models/user');

async function handleCreateEntry(req, res) {
    const body = req.body;
    if (!body.username || !body.title || !body.location || !body.date) {
        return res.status(400).json({ error: 'Full information is required' });
    }
    const shortId = shortid();
    const { username, title, location, date, photos, text } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let entry = await Entry.create({
            author: user._id,
            shortId,
            title,
            location,
            date,
            photos,
            text,
            viewHistory: [],
            editHistory: []
        });

        await User.findByIdAndUpdate(user._id, { $push: { entries: entry._id } });

        res.status(201).json(entry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function handleUpdateEntry(req, res) {
    const { username, title, location, date, photos, text } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let entry = await Entry.findOne({ author: user._id, title });

        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        entry.title = title;
        entry.location = location;
        entry.date = date;
        entry.photos = photos;
        entry.text = text;

        entry.editHistory.push({ timestamp: Date.now() });

        await entry.save();

        res.json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleDeleteEntry(req, res) {
    const { username, title } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let entry = await Entry.findOne({ author: user._id, title });

        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        await Entry.findByIdAndDelete(entry._id);

        await User.findByIdAndUpdate(user._id, { $pull: { entries: entry._id } });

        res.status(200).json({ message: 'The entry has been deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetEntry(req, res) {
    const { username, title } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let entry = await Entry.findOne({ author: user._id, title });

        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).json({ status: 'not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetEntries(req, res) {
    const { username } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const entries = await Entry.find({ author: user._id });
        res.status(200).json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handleCreateEntry,
    handleUpdateEntry,
    handleDeleteEntry,
    handleGetEntry,
    handleGetEntries
};
