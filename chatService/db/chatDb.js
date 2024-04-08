const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const createChatTransaction = async (user1, user2) => {
  return new Promise(async (resolve, reject) => {
    try{
      let data  =  await prisma.$queryRaw`select * from user_chat
      where first_user = ${user1} and second_user = ${user2}
      OR first_user = ${user2} and second_user = ${user1}`
      if(data?.length){
        console.log(data)
        resolve(data);
      }else{
        let result = await prisma.user_chat.create({
          data:{
            first_user: user1,
            second_user: user2,
            chat_check: true
          }
        })
        resolve(result)
      }
     
    }catch(err){
      console.log(err);
      reject(err);
    }
  })
}

const addChatMsg = (user_chat_unique_table_transaction, user, message) => {
  return new Promise(async (resolve, reject) => {
    try{
      let result = await prisma.user_message.create({
        data: {
          message: message,
          user_chat_unique_table_transaction: user_chat_unique_table_transaction,
          userId: user
        }
      })
      resolve(result);
    }catch(err){
      console.log(err);
      reject(err);
    }
  })
}

const getMessageOnTransactionId = (transactionId) => {
  return new Promise(async (resolve, reject) => {
    try{
      let result = await prisma.user_message.findMany({
        user_chat_unique_table_transaction: transactionId 
      })
      resolve(result);
    }catch(err){
      reject(err);
    }
  })
}

module.exports = {
  createChatTransaction: createChatTransaction,
  addChatMsg: addChatMsg,
  getMessageOnTransactionId: getMessageOnTransactionId
};
