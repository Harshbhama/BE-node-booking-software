const express = require('express')
const router = express.Router();
const { imageKitMethod } = require("../../utilities/imageKitUpload");
const { addIternaryDb, listIternaryDb } = require("../db/internaryDb");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const { createClient } = require('redis')
const client = createClient();
client.connect();
client.on('error', err => console.log('Redis Client Error', err));
const opts = {
  points: 6, // Number of Api calls assigned to api route
  duration: 10, // Per second
};
const rateLimiter = new RateLimiterMemory(opts);
router.post('/addIternary', async (req, res) => {
  const fileData  = req.files.file.data;
  const fileName = req.get("images")
  const userId = req.get("userid")
  const headerValues = JSON.parse(req.get("textProps"))
  const {title, description} = headerValues;
  
  try{
    let result = await imageKitMethod(fileName, fileData)
    await addIternaryDb(title, description, userId, result?.url)
    res.json({
      error: false,
      msg: "Data inserted successfully"
    })
  }catch(err){
    res.json({
      error: true,
      msg: err
    })
  }

})
router.get("/listIternary", async (req, res) => {

  await client.set('foo', 'bar');
  const userId = req.get("userid");

  rateLimiter.consume(userId)
    .then(async (rateLimiterRes) => {
      try {
        let data = await listIternaryDb(userId);
        await client.set(userId+'_list_iternary', JSON.stringify(data))

        res.json({
          error: false,
          data: data,
          msg: 'Fetched data successfully'
        });
      } catch (err) {

        res.json({
          error: true,
          msg: err
        })
      }
    })
    .catch(async (rateLimiterRes) => {
      // Not enough points to consume
      let cachedData = JSON.parse(await client.get(userId+'_list_iternary'))
      res.json({
        error: false,
        data: cachedData,
        msg: `Rate limit exceeded for this user having user id as ${userId}, caching data from redis`
      });

    });
});
module.exports = router;