const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

const UserSchema = new Schema (
    {
        email: { type: String, minLength: 2, maxLength: 20, unique: true, required: true },
        username: { type: String, minLength: 2, maxLength: 20, unique: true, required: true},
        password: { type: String, minLength: 2, required: true },
        creation: { type: Date, default: Date.now()},
        display_name: { type: String, minLength: 1, maxLength: 20, required: true},
        about_me: { type: String, default: '', maxLength: 100},
        friends: [ {type: Schema.Types.ObjectId, ref: 'Friend' } ],
        avatar_url: { type: String },
        chats: [ {type: Schema.Types.ObjectId, ref: 'Chat'} ],
        online: { type: Boolean, default: false}
    },
    {
        minimize: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

UserSchema.virtual('creation_formatted').get(function () {
    return DateTime.fromJSDate(this.creation).toFormat('yyyy-MM-dd')
})

UserSchema.virtual('url').get(function () {
    return `/users/${this._id}`
})

module.exports = mongoose.model('User', UserSchema)