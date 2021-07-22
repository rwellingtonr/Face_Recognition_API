//API responsible for recognise the faces
import Clarifai from "clarifai"

const app = new Clarifai.App({
  apiKey: "f8a81a51540c49c0b23bc7ea54242acd",
})

const handleAPI = () => (req, res) => {
  const { input } = req.body
  try {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((data) => {
        res.json(data)
      })
      .catch(() => res.status(400).json("unable to work with API"))
  } catch (error) {
    console.log("Error with credentials", error)
  }
}

const imgCounter = (db) => (req, res) => {
  const { id } = req.body
  // increment the user's entries
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((e) => res.status(400).json("Unable to increment the entries :("))
}
export default { imgCounter, handleAPI }
