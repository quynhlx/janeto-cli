import { Schema, model } from "mongoose";
import { IUserModel } from "../../interfaces";
import { Roles, CollectionNames } from "../../constants";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: String,
        salt: String,
        gender: String,
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: String,
        avatar: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            default: Roles.User
        },
        birthday: {
            type: Date,
            default: Date.now()
        },
        activated: {
            type: Boolean,
            default: false
        }
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

// Duplicate the ID field.
userSchema.virtual("id").get(function() {
    return this._id.toHexString();
});

export const UserModel = model<IUserModel>(CollectionNames.User, userSchema);
