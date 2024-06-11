const { default: mongoose } = require('mongoose');
const mongoos = require ('mongoose');

const URI = 'mongodb+srv://raja:raja@cluster0.qpibr5a.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0';

const connectdb =async ()=>{
    try {
      await  mongoose.connect(URI)
      console.log('connection sucessful to db')
    } catch (error) {
        console.error('connection failed to db')
        
    }
}

module.exports= connectdb;