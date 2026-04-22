import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Strong Password is required (A-a-1-#) 8 digits ",
      ],
    },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparedPassword = async function (candidatePassword) {
  if (!this.password) return;
  return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("Users", userSchema);

export default userModel;
