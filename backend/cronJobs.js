const cron = require("node-cron");

// Runs every minute
cron.schedule("* * * * *", () => {
  console.log("Running a task every minute");
});