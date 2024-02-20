const Persons = ({allPersons, onDeletePerson}) => {
  return (
    <>
      {allPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDeletePerson(person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
