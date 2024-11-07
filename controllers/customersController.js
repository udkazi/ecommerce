const { createToken } = require('../middlewares/jwtToken');
const Customer = require('../models/Customer');
const asyncHandler = require('express-async-handler');


//get all users
exports.getCustomer = asyncHandler( async (req, res) => {
    try{
        const customers = await Customer.find()
        res.json(customers);
    }catch(error){
        res.sendStatus(400).json({error:error})
    }
});

//post all users
exports.createCustomer = asyncHandler (async (req, res) => {
        const email = req?.body?.email;
        const findUser = await Customer.findOne({email:email});
        console.log(findUser,'findUser');
        if(!findUser){
            const customer = new Customer(req.body);
            await customer.save();
            res.status(201).send({ message: 'User registered successfully', customer });
        }else{
            throw new Error ('User already exists')
        }
});

//login users
exports.loginCustomer = asyncHandler(async(req,res)=>{
    const {email,password} = req?.body;
    const findUser = await Customer.findOne({email:email});
    if(findUser && await(findUser.isPasswordMatched(password))){
        res.json({
            _id:findUser?._id,
            token:createToken(findUser?._id),
            firstName:findUser?.firstName,
            lastName:findUser?.lastName,
            email:findUser?.email,
            mobile:findUser?.mobile
        })
    }else{
        throw new Error("Invalid Credentials")
    }
})