const Customer = require('../models/Customer')

//get
exports.getCustomer = async (req, res) => {
    try{
        const customers = await Customer.find()
        res.json(customers);
    }catch(error){
        res.sendStatus(400).json({error:error})
    }
};

//post
exports.createCustomer = async (req, res) => {
    try{
        const email = req?.body?.email;
        const findUser = await Customer.findOne({email:email});
        console.log(findUser,'findUser');
        if(!findUser){
            const customer = new Customer(req.body);
            await customer.save();
            res.status(201).send({ message: 'User registered successfully', customer });
        }else{
            res.json({
                msg:'Email already exist',
                success:false
            });
        }
    }catch(error){
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).reduce((acc, key) => {
                acc[key] = error.errors[key].message;
                return acc;
            }, {});
            return res.status(400).send({ errors });
        }
        res.status(500).send({ error: 'Server error' });
    }
};