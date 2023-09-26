const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

const MessageSchema = new Schema (
    {
        sender: { type: Schema.Types.ObjectId, ref: 'User'},
        timestamp: { type: Date, default: Date.now()},
        message: { type: String, minLength: 2, required: true}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

MessageSchema.virtual('timestamp_formatted').get( function () {
    return DateTime.fromJSDate(this.timestamp).toFormat('yyyy-MM-dd')
})

MessageSchema.virtual('creation_time').get( function () {
    return DateTime.fromJSDate(this.creation).toFormat('hh:mm a')
})

module.exports = mongoose.model('Message', MessageSchema)