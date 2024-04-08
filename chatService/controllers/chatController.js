const express = require('express')
const router = express.Router();
const { createClient } = require('redis')
const { createChatTransaction, addChatMsg, getMessageOnTransactionId } = require("../db/chatDb");
const client = createClient();
client.connect();
client.on('error', err => console.log('Redis Client Error', err));

router.post('/createChatTransactionServer', async (req, res) => {
  const userId = req.get("userid")
  const friendsid = req.get('friendsid')
  try{
    let result = await createChatTransaction(userId, friendsid);
    res.json({
      error: false,
      msg: 'Chat transaction fetched successfully',
      data: result
    })
  }catch(err){
    res.json({
      error: true,
      msg: err
    })
  }
})
router.post('/addChatMsgService', async (req, res) => {
  const userId = req.get("userid")
  const {tableTransactionId, message}  = req.body
  try{
    let result = await addChatMsg(tableTransactionId, userId, message)
    res.json({
      error: false,
      message: 'Data inserted successfully',
      result: result
    })
  }catch(err){
    res.json({
      error: true,
      message: err
    })
  }
})
router.get('/getUserMessage', async (req, res) => {
  const transactionId = req.get("user_chat_unique_table_transaction")
  try{
    let result = await getMessageOnTransactionId(transactionId)
    res.json({
      error: false,
      message: 'Data fetched successfully',
      result: result
    })
  }catch(err){
    res.json({
      error: true,
      message: err
    })
  }
})


module.exports = router;