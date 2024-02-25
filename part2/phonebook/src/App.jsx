import { useState, useEffect } from "react";

import "./index.css";

import Persons from "./Persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Notification from "./Notification";

import personService from "./services/persons";

const Type = {
	Success: "success",
	Error: "error"
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredPersons, setFilteredPersons] = useState([])
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState()

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
    })
  }, [])

  const handleFilter = (e) => {
    const searchTerm = e.target.value;
    const filteredItems = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setFilteredPersons(filteredItems);
  }

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id)
    if (person === undefined) return

    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        const updatedPersons = persons.filter(p => p.id != person.id)
        setPersons(updatedPersons)
        setFilteredPersons(updatedPersons)
      })
    }
  }

  const updatePerson = (person) => {
    const confirm = `${person.name} is already added to phonebook, replace the old number with the new one?`
    if (window.confirm(confirm)) {
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(person.id, changedPerson)
        .then((data) => {
          const updatedPersons = persons.map(p => p.id !== person.id ? p : data)
          setPersons(updatedPersons)
          setFilteredPersons(updatedPersons)

          setNotificationType(Type.Success)
          setNotificationMsg(`Edited ${changedPerson.name}`)
          setTimeout(() => setNotificationMsg(null), 2000)
        })
        .catch((error) => {
          setNotificationMsg(
            `Information of ${changedPerson.name} has already been removed from server`
          )
          setNotificationType(Type.Error)
          setTimeout(() => setNotificationMsg(null), 2000)

          const updatedPersons = persons.filter(p => p.id !== person.id)
          setPersons(updatedPersons)
          setFilteredPersons(updatedPersons)
        })
    }
  }

  const addPerson = (e) => {
    e.preventDefault();
    const person = persons.find((p) => p.name === newName);
    if (person === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setFilteredPersons(persons.concat(returnedPerson))
        
        setNotificationType(Type.Success)
        setNotificationMsg(`Added ${returnedPerson.name}`)
        setTimeout(() => setNotificationMsg(null), 2000)
      })
    } else updatePerson(person)

    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMsg} type={notificationType} />
      <Filter onFilterChange={handleFilter} />

      <h2>add a new</h2>

      <PersonForm
        onSubmitPerson={addPerson}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons allPersons={filteredPersons} onDeletePerson={deletePerson} />
    </div>
  )
}

export default App;
