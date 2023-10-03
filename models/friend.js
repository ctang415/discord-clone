const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FriendSchema = new Schema (
    {
        recipient: { type: Schema.Types.ObjectId, ref: 'User'},
        requester: { type: Schema.Types.ObjectId, ref: 'User'},
        status: {
            type: String,
            enum: [ 'Add', 'Requested', 'Pending', 'Friends'],
            default: 'Add'
        }
    }
)


module.exports = mongoose.model('Friend', FriendSchema)