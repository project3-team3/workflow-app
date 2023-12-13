const db = require("../config/connection");
const { Quote, BalanceTip, User } = require("../models");
const inspiringQuoteSeeds = require("./inspiringQuoteSeeds.json");
const balanceTipSeeds = require("./balanceTipSeeds.json");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Quote", "quotes");

    await cleanDB("BalanceTip", "tips");

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
