import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, numPoints, highscore, dispatch } = useQuiz();

  const pointToPercentage = Math.round((points / numPoints) * 100);
  let emoji;

  if (pointToPercentage === 100) emoji = "🏆";
  if (pointToPercentage >= 80 && pointToPercentage < 100) emoji = "🎖️";
  if (pointToPercentage >= 50 && pointToPercentage < 80) emoji = "🤨";
  if (pointToPercentage >= 0 && pointToPercentage < 50) emoji = "😶";
  if (pointToPercentage === 0) emoji = "🤐";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored {points} Out Of{" "}
        <strong>{numPoints}</strong> ({pointToPercentage}%)
      </p>
      <p className="highscore">( Highscore : {highscore} )</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
