import Content from "./Content";
import Header from "./Header";

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <>
          <Header course={course.name} />
          <Content parts={course.parts} />
        </>
      ))}
    </>
  );
};

export default Course;
