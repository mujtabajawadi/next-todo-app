import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

userSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const User = mongoose.models?.User || mongoose.model("User", userSchema)
export default User