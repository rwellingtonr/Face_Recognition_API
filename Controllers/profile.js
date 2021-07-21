const profileId = (db) => (req, res) => {
  const { id } = req.params
  //Catch the user profile
  db.select("*")
    .from("users")
    .where("id", "=", id)
    .then((user) => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.json("Could'n find the user")
      }
    })
    .catch(() => res.status(400).json("Error to find the user!"))
}

export default { profileId }
