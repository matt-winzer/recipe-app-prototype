const bcrypt = require('bcrypt')

// Sequelize models
const User = require('../models').user


const registerUser = (req, res, next) => {
  const { name, email, password, password2 } = req.body
  
  // Validate user
  // TODO: improve validation
  if      (!validUser(req.body))                    res.json({ message: 'Please enter a username, email, and a password longer than 5 characters.' })
  else if (!matchingPasswords(password, password2)) res.json({ message: 'Please enter matching passwords.' })
  else {
    // Validation passed: check if user already exists in db
    User.findOne({
      where: { email: email }
    })
      .then(user => {
        const saltRounds = 10
        return user
          // User exists: respond with error
          ? res.status(409).json({ message: 'This email has already been registered. Please try again with a different email.' })
          // User doesn't exist: hash password
          : bcrypt.hash(password, saltRounds)
      })
      .then(hash => {
        // Create new user with hashed password
        return User.create(createUserObject(name, email, hash))
      })
      .then(newUser => {
        res.status(201).json({ user: cleanUser(newUser) })
      })
      .catch(next)
  }

}


// ------------------------------ Validation Helpers ------------------------------

function validUser({ name, email, password, password2 }) {
  const fieldsPresent = name && email && password && password2
  const validName = typeof name === 'string'
  const validEmail = typeof email === 'string'
  const validPassword = typeof password === 'string' && password.length > 5
  const validPassword2 = typeof password2 === 'string' && password2.length > 5

  return fieldsPresent && validName && validEmail && validPassword && validPassword2
}

function matchingPasswords(password1, password2) {
  return password1 === password2
}

// ------------------------------ Create User Helpers ------------------------------

function createUserObject(name, email, hash) {
  return {
    name: name,
    email: email,
    password: hash
  }
}

function cleanUser({ id, name, email }) {
  return { id, name, email }
}

module.exports = {
  registerUser
}