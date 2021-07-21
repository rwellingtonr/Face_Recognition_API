const handleRegister = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json("incorrect for submission")
  } else {
    //hash password
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    //write into the Database tables 'users' and 'login'
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then(async (loginEmail) => {
          const user = await trx("users").returning("*").insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          res.json(user[0])
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(() => res.status(400).json("unable to register"))
  }
}
export default { handleRegister }
