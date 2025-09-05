const { people } = require("../data");

//get all people
const getAllPeople = (req, res) => {
  res.json(people);
};

//get person by ID

const getPersonByID = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({ message: "Person Not Found" });
  }
  res.status(200).json(person);
};

//post add Person
const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Provide name please" });
  }
  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);
  res
    .status(201)
    .json({ succes: true, data: newPerson, message: "Person added" });
};

//put Update existed person info
const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({ message: "Person not Found" });
  }
  person.name = req.body.name || person.name;
  res.status(200).json({ succes: true, data: person });
};

//delete existed person
const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const existedPerson = people.some((p) => p.id === id);
  if (!existedPerson) {
    return res.status(404).json({ message: "Person doesnt exist" });
  }
  const updatedPeople = people.filter((p) => p.id !== id);
  people.length = 0;
  people.push(...updatedPeople);

  res.status(200).json({ success: true, message: "Пользователь удалён" });
};

module.exports = {
  getAllPeople,
  getPersonByID,
  addPerson,
  updatePerson,
  deletePerson,
};
