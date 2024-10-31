import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { dispatch, answer, step, numQuestions } = useQuiz();

  if (answer === null) return null;

  if (step + 1 < numQuestions)
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </>
    );

  if (step + 1 === numQuestions)
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </>
    );
}

export default NextButton;
