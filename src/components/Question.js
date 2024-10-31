import { useQuiz } from "../contexts/QuizContext";
import Option from "./Option";

function Question() {
  const { questions, dispatch, answer, step } = useQuiz();

  return (
    <div>
      <h4>{questions[step].question}</h4>
      <Option question={questions[step]} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
