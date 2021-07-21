const login = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json("incorrect for submission")
  } else {
    //Check in the user and the password
    db("login")
      .where("email", "=", email)
      .then(async (data) => {
        const canProceed = bcrypt.compareSync(password, data[0].hash)
        if (canProceed) {
          const user = await db("users").where("email", email)
          return res.json(user[0])
        } else {
          res.status(400).json("Check out you email and password")
        }
      })
      .catch(() => res.status(400).json("Wrong credentials!"))
  }
}

export default { login }
