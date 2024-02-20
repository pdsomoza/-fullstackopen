const PersonForm = ({onSubmitPerson, newName, newNumber,onNameChange,onNumberChange}) => {
  return (
    <form onSubmit={onSubmitPerson}>
    <div>
      name:
      <input onChange={onNameChange} value={newName} />
    </div>
    <div>
      number:
      <input
        onChange={onNumberChange}
        value={newNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  );
};

export default PersonForm;
