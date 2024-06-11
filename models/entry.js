const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    shortId:{
        type:String,
        required: true,
        unique:true
    },
    title:{
        type:String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    photos:{
        type:[String] 
    },
    text:{
        type: String,
        required: true
    },
    viewHistory:[{ timestamp: {type: Number}}],
    editHistory:[{ timestamp: {type: Number}}],
},
{
    timestamps:true
}
)

const Entry=mongoose.model("Entry",entrySchema)

module.exports=Entry;