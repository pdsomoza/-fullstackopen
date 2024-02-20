import Part from "./Part";

const Content = ({ parts }) => {
  const sum = parts.reduce((total, item) => total + item.exercises, 0);

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <b>total of {sum} exercises</b>
    </>
  );
};

export default Content;
