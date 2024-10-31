import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

// const SECR_PER_QUESTION = 30;

// const initialState = {
//   questions: [],

//   // 'loading','error','ready','active','finished'
//   status: "loading",
//   step: 0,
//   answer: null,
//   points: 0,
//   highscore: 0,
//   secondsRemaining: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "dataFetched":
//       return { ...state, questions: action.payload, status: "ready" };
//     case "dataFailed":
//       return { ...state, status: "error" };
//     case "active":
//       return {
//         ...state,
//         status: "active",
//         secondsRemaining: state.questions.length * SECR_PER_QUESTION,
//       };
//     case "answer":
//       const question = state.questions[state.step];
//       return {
//         ...state,
//         answer: action.payload,
//         points:
//           action.payload === question.correctOption
//             ? state.points + question.points
//             : state.points,
//       };
//     case "nextQuestion":
//       return { ...state, step: state.step++, answer: null };
//     case "finish":
//       return {
//         ...state,
//         status: "finished",
//         highscore:
//           action.payload > state.highscore ? action.payload : state.highscore,
//       };
//     case "restart":
//       return {
//         ...initialState,
//         questions: state.questions,
//         status: "ready",

//         highscore:
//           state.points > state.highscore ? state.points : state.highscore,
//       };
//     case "tick":
//       return {
//         ...state,
//         secondsRemaining: state.secondsRemaining--,
//         status: state.secondsRemaining < 0 ? "finished" : state.status,
//       };
//     default:
//       throw new Error("Action Unkown");
//   }
// }

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
