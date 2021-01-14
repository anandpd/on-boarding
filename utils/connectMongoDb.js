import mongoose from 'mongoose'

(async function () {
   try {
      await mongoose.connect(process.env.DB_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false
      });
      console.log(':-> Mongo DB connected successfully !')
   } catch (error) {
      return error;
   }
})()