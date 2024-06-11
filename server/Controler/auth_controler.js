const mongoose = require('mongoose');
const User = require('../usermodel/schema'); // Renamed 'user' to 'User' for consistency with the schema import
const bcrypt= require('bcryptjs');
const Todo = require('../usermodel/Todo_model')

const home = async (req, res) => {
    try {
        res.status(200).send('Hello from home');
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExist = await User.findOne({ username }); // Use username instead of email

        if (!userExist) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Comparing password
        const user = await bcrypt.compare(password, userExist.password);

        if (user) {
            res.status(200).json({ 
                msg: 'Login successful' ,
                userId:userExist._id.toString(),
                token: await userExist.generateToken(),
            });
        } else {
            res.status(400).json({ msg: 'Invalid Password or Username' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, phoneNo, password } = req.body;
        const userExist = await User.findOne({ email });

        console.log(req.body);

        if (userExist) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password,saltRound)
        // If the user doesn't exist, create a new user (this part is missing)
        const newUser = new User({ username, email, phoneNo, password:hash_password });
        await newUser.save();

        res.status(200).json({ msg: 'User created' , token: await newUser.generateToken() , userId: newUser._id.toString(),});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const services = async (req, res) => {
    try {
        const response = await services.find();
        if(!response){
            res.status(401).json('no services found');
        }
        res.status(200).json('no services found');
       
    } catch (error) {
        console.log(`services:${error}`);
    }
};

const user = async (res,req)=>{
  try {
    const userData = req.User;
    console.log(userData);
    return res.status(200).json({msg: userData});
  } catch (error) {
    console.log(`erroe form user route ${error}`);
  }
}

const Todolist = async (req, res) => {
    try {
        const { method } = req;

        switch (method) {
            case 'GET':
                const todos = await Todo.find();
                res.status(200).json(todos);
                break;
            case 'POST':
                const { text } = req.body;
                if (!text) {
                    return res.status(400).json({ msg: 'Text field is required' });
                }
                const newTodo = new Todo({ text });
                await newTodo.save();
                res.status(201).json(newTodo);
                break;
            case 'PUT':
                const { id } = req.query;
                const { newText } = req.body;
                if (!newText) {
                    return res.status(400).json({ msg: 'New text field is required' });
                }
                const updatedTodo = await Todo.findByIdAndUpdate(id, { text: newText }, { new: true });
                if (!updatedTodo) {
                    return res.status(404).json({ msg: 'Todo not found' });
                }
                res.status(200).json(updatedTodo);
                break;
            case 'DELETE':
                const { todoId } = req.query;
                const deletedTodo = await Todo.findByIdAndDelete(todoId);
                if (!deletedTodo) {
                    return res.status(404).json({ msg: 'Todo not found' });
                }
                res.status(200).json({ msg: 'Todo deleted' });
                break;
            default:
                res.status(405).json({ msg: 'Method not allowed' });
                break;
        }
    } catch (error) {
        console.error(`Todo error: ${error}`);
        res.status(500).json({ msg: 'Server error' });
    }

};
module.exports = { home, login, register, services , user , Todolist}
