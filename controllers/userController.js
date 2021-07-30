const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  //revisar si hay errores con validator results
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //catch email y passowrd
  const { email, password } = req.body;
  try {
    //revisar si aya existe el email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User registed " });
    }

    //create user
    user = new User(req.body);

    //hast to password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //save user
    await user.save();

    //create JWT
    const payload = {
      user: {
        id: user.id, //le estamos pasando el id del   user = new User(req.body);
      },
    };

    //firmar el JWT

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600, //1 hour
      },
      (error, token) => {
        if (error) throw error;
        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("User not register", error);
    res.status(400).send("Error registrer");
  }
};



