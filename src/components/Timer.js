import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();

  const min = String(Math.floor(secondsRemaining / 60)).padStart(2, 0);
  const sec = String(secondsRemaining % 60).padStart(2, 0);

  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(timer);
    },
    [secondsRemaining, dispatch]
  );
  return (
    <div className="timer">
      {min}:{sec}
    </div>
  );
}

export default Timer;
