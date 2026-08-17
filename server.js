const express = require("express");
const path = require("path");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());

app.use(logger);

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.use("/tasks", taskRoutes);

// MUST BE LAST
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});