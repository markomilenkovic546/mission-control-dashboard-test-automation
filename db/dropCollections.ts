import mongoose, { Collection } from 'mongoose';

require('dotenv').config();

// Interface for collection object
interface ICollection {
    name: string;
}

// Function to drop all collections
const dropAllCollections = async () => {
    try {
        // MongoDB connection URI
        const mongoURI = process.env.MONGO_URL;

        // Connect to MongoDB Atlas
        await mongoose.connect(mongoURI);

        console.log('Connected to MongoDB Atlas');

        // Get array of collection names
        const collections: Collection<ICollection>[] = (await mongoose.connection.db
            .listCollections()
            .toArray()) as Collection<ICollection>[];

        // Iterate over collections and drop each one
        for (let collection of collections) {
            await mongoose.connection.db.dropCollection(collection.name);
            console.log(`Collection ${collection.name} dropped successfully`);
        }

        console.log('All collections dropped successfully');

        // Close the connection after dropping all collections
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error dropping collections:', error);

        // Close the connection even if dropping collections failed
        await mongoose.connection.close();
    }
};

export default dropAllCollections;
