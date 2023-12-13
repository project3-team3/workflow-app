const db = require("../config/connection");
const { User, Quote, BalanceTip } = require("../models");
const inspiringQuoteSeeds = require("./inspiringQuoteSeeds.json");
const balanceTipSeeds = require("./balanceTipSeeds.json");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Quote", "quotes");

    await cleanDB("BalanceTip", "balancetips");

    await cleanDB("User", "users");

    await Quote.create(inspiringQuoteSeeds);

    await BalanceTip.create(balanceTipSeeds);

    await User.create(userSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("--- DATABASE SEEDED ---");
  process.exit(0);
});

/*
db.on("connected", async () => {
  try {
    await cleanDB("Quote", "quotes");
    await cleanDB("BalanceTip", "tips");
    await cleanDB("User", "users");

    await Quote.create(inspiringQuoteSeeds);
    await BalanceTip.create(balanceTipSeeds);
    await User.create(userSeeds);

    console.log("--- DATABASE SEEDED ---");
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection after seeding
    db.close();
  }
});
*/