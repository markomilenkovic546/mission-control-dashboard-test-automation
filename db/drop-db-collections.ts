import mongoose, { Collection } from 'mongoose';
require('dotenv').config();

//MongoDB connection URI
const mongoURI = process.env.MONGO_URL;

// Interface for collection object
interface ICollection {
    name: string;
}

//Connect to MongoDB Atlas
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        dropAllCollections();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

//Function to drop all collections
const dropAllCollections = async () => {
    try {
        //Get array of collection names
        const collections: Collection<ICollection>[] = (await mongoose.connection.db
            .listCollections()
            .toArray()) as Collection<ICollection>[];

        //Iterate over collections and drop each one
        for (let collection of collections) {
            await mongoose.connection.db.dropCollection(collection.name);
            console.log(`Collection ${collection.name} dropped successfully`);
        }

        console.log('All collections dropped successfully');

        //Close the connection after dropping all collections
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error dropping collections:', error);
        //Close the connection even if dropping collections failed
        await mongoose.connection.close();
    }
};
