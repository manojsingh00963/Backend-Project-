import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    const { fullName, email, username, password } = req.body

    // validation - not empty
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required...!")
    }

    const existedUser = User.findOne({
        // 
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "user with email or username already exist...!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const converImageLocalPath = req.files?.converImage[0]?.path;

    if(!avatarLocalPath && converImageLocalPath){
        throw new ApiError(400, "Avatar file is required...!")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(converImageLocalPath)

    if (avatar){
        throw new ApiError(400, "Avatar file is required...!")
    }
    
   const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email : email.toLowerCase(),
        password,
        username: username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "something went wrong while regestring the user...!")
    }
    
    return res.status(201).json(new ApiResponse(200, createdUser, "user registered Successufully!"))

})


export { registerUser }