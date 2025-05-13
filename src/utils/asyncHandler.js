
// with promises

const asyncHandler = (requestHandler) => {
    // return this higher order function
    return (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}


export {asyncHandler}




// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error",
//         })
//     }
// }




// const asyncHandler = (func) => {
//     async()=> {
    
//     }
// }