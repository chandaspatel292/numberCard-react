import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define the endpoint for saving card details
app.post("/saveData", (req, res) => {
  const cardDetails = req.body;

  // Read existing data from the JSON file (if it exists)
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync("cardDetails.json", "utf8"));
  } catch (error) {
    // Handle error reading the file (e.g., the file doesn't exist yet)
    console.error("Error reading JSON file:", error);
  }

  // Append the new card details to the existing data
  existingData.push(cardDetails);

  // Write the updated data back to the JSON file
  fs.writeFile(
    "cardDetails.json",
    JSON.stringify(existingData, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing to JSON file:", err);
        res.status(500).json({ message: "Error writing data to file" });
      } else {
        console.log("Card details added to cardDetails.json");
        res.status(200).json({ message: "Data saved successfully" });
      }
    }
  );
});

// Start the server
const port = 3001; // You can change this port as needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
