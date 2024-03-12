const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const addIternaryDb = async (title, description, userId, fileUrl) => {
  return new Promise(async (resolve, reject) => {
    try{
      await prisma.agent_iternary.create({
        data: {
          userId: userId,
          title: title,
          description: description,
          images: [fileUrl]
        }
      })
      resolve(true);
    }catch(err){
      console.log(err)
      reject(false)
    }
  })
}

const listIternaryDb = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try{
      let data  =  await prisma.$queryRaw`Select * from agent_iternary
      where agent_iternary.user_id = ${userId}`
      resolve(data);
    }catch(err){
      console.log(err);
      reject(err);
    }
  })
}

module.exports = {
  addIternaryDb: addIternaryDb,
  listIternaryDb: listIternaryDb
};
