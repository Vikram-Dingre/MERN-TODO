import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
  path: "./src/.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port : ${process.env.PORT} ✅`);
    });
  })
  .catch((error) => {
    console.log("Error while conecting DB ❌");
  });
