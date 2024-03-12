const express = require('express')
const router = express.Router();
const { imageKitMethod } = require("../../utilities/imageKitUpload");
const { addIternaryDb, listIternaryDb } = require("../db/internaryDb");
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
  const userId = req.get("userid");
  try {
    let data = await listIternaryDb(userId);
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
});
module.exports = router;