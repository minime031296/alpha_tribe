const { Schema, model } = require('mongoose');

const stockSchema = new Schema({
    stockSymbol: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        
    },
    tags: {
        type: [String], 
        required: true,
    },
    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    likesCount: {
        type: Number,
        default: 0, 
    },
    comments: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
        },
        comment: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Stock = model('Stock', stockSchema);

module.exports = Stock;
