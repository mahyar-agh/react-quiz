import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { step, points, answer, numQuestions, numPoints } = useQuiz();
  return (
    <header className="progress">
      <progress
        id="file"
        value={step + Number(answer !== null)}
        max={numQuestions}
      />
      <p>
        Question <strong>{step + 1} </strong>/ {numQuestions}
      </p>
      <p>
        Points <strong>{points} </strong>/ {numPoints}
      </p>
    </header>
  );
}

export default Progress;
