const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getEvents(req, res) 
        }

        case 'POST': {
            return addEvent(req, res);
        }

        case 'PUT': {
            return updateEvent(req, res);
        }

        case 'DELETE': {
            return deleteEvent(req, res);
        }
    }
}

async function getEvents(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the events
        let events = await db
            .collection('events')
            .find({user: req.query.name})
            .sort({ published: -1 })
            .toArray();
        // return the event
        return res.json({
            message: JSON.parse(JSON.stringify(events)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function addEvent(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the event
        await db.collection('events').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Event added successfully',
            success: true
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function updateEvent(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();

        // update the published status of the event
        await db.collection('events').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        // return a message
        return res.json({
            message: 'Event updated successfully',
            success: true,
        });
    } catch (error) {

        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function deleteEvent(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the event
        await db.collection('events').deleteOne({
            _id: new ObjectId(req.body),
        });

        // returning a message
        return res.json({
            message: 'Event deleted successfully',
            success: true,
        });
    } catch (error) {

        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}