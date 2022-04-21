const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getDogs(req, res) 
        }

        case 'POST': {
            return addDog(req, res);
        }

        case 'DELETE': {
            return deleteDog(req, res);
        }
    }
}

async function getDogs(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the dogs
        let dogs = await db
            .collection('dogs')
            .find({user: req.query.name})
            .sort({ createdAt: -1})
            .toArray();
        // return the dogs
        return res.json({
            message: JSON.parse(JSON.stringify(dogs)),
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

async function addDog(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the Dog
        await db.collection('dogs').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Dog added successfully',
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

async function deleteDog(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the dog
        await db.collection('dogs').deleteOne({
            _id: new ObjectId(req.body),
        });

        // returning a message
        return res.json({
            message: 'dog deleted successfully',
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