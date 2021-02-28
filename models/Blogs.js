const mongoose = require('mongoose');
// const Review = require('./review')
const Schema = mongoose.Schema;


const BlogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    // author:{
    //     type:String,
    //     required: true
    // },
    content:{
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

BlogSchema.post('findOneAndDelete', async function (doc) {	
    if (doc) {	
        await Review.deleteMany({	
            _id: {	
                $in: doc.reviews	
            }	
        })	
    }	
})

const Blogs = mongoose.model('Blogs', BlogSchema);

module.exports = Blogs;