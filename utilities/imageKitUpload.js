var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : "public_FjTn7gJOwJL+EwbbEjyv12vxnc4=",
    privateKey : "private_a+rr3kLMi9Cpa+ml5yX5nrU7TXY=",
    urlEndpoint : "https://ik.imagekit.io/agzhv5q78"
});

const imageKitMethod = async (name, data) => {
  return new Promise ((resolve, reject) => {
    imagekit.upload({
      file : data,
      fileName : name,
    }, function(error, result) {
      if(error) {
        console.log(error)
        reject(false)
      }else{
        console.log(result)
        resolve(result);
      }
    });
  })
  
}
module.exports = {
  imageKitMethod: imageKitMethod
}