import "dotenv/config";
import connectDB from "./config/mongodb.js";
import app from './app.js';

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
