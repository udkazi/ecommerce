//not found
const notFound = (req,res,next)=>{
    const error = new Error(`Not Found`);
    res.status(404).json({ error: "Route not found" });
    next(error);
}

const errorHandler = (err,req,res,next)=>{
    res.status(500).json({
        message:err?.message,
        // stack:err?.stack
    });
}

module.exports = {notFound,errorHandler}