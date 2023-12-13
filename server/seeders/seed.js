const db = require("../config/connection");
const { Quote, BalanceTip } = require("../models");
const inspiringQuoteSeeds = require("./inspiringQuoteSeeds.json");
const balanceTipSeeds = require("./balanceTipSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Quote", "quotes");

    await cleanDB("BalanceTip", "tips");

    await Quote.create(inspiringQuoteSeeds);

    await BalanceTip.create(balanceTipSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("--- DATABASE SEEDED ---");
  process.exit(0);
});
