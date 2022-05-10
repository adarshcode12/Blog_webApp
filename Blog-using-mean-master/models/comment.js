const mongoose = require('mongoose');

const Comment = mongoose.model('Comments', {
    comm: {
        type: String,
        required: true
    },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    postid: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }

});
module.exports = Comment