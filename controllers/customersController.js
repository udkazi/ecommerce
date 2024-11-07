const { createToken } = require('../middlewares/jwtToken');
const Customer = require('../models/Customer');
const asyncHandler = require('express-async-handler');


//get all users
exports.getAllCustomer = asyncHandler( async (req, res) => {
    try{
        const customers = await Customer.find().select("-password");
        res.json(customers);
    }catch(error){
        res.sendStatus(400).json({error:error})
    }
});

//get single user
exports.getSingleCustomer = asyncHandler( async (req, res) => {
    try{
        const {id} = req?.params
        const customer = await Customer.findOne({_id:id}).select("-password");
        res.json(customer);
    }catch(error){
        res.sendStatus(400).json({error:error})
    }
});

//update users

exports.updateSingleCustomer = asyncHandler( async (req, res) => {
    try{
        const {id} = req?.params
        const updateCustomer = await Customer.findByIdAndUpdate(
            id,
            {
            firstName:req?.body?.firstName,
            lastName:req?.body?.lastName,
            email:req?.body?.email,
            mobile:req?.body?.mobile
            },
            {
                new:true
            }
        );
        res.json({
            firstName:updateCustomer?.firstName,
            lastName:updateCustomer?.lastName,
            email:updateCustomer?.email,
            mobile:updateCustomer?.mobile
        });
    }catch(error){
        res.sendStatus(400).json({error:error})
    }
});

//delete user

exports.deleteSingleCustomer = asyncHandler( async (req, res) => {
    try{
        const {id} = req?.params
        const customer = await Customer.findByIdAndDelete({_id:id})
        res.json({
            message:'User deleted succesfully '
        });
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
            res.status(201).send({ message: 'User registered successfully', 
                firstName:customer?.firstName,
                lastName:customer?.lastName,
                email:customer?.email,
                mobile:customer?.mobile
             });
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