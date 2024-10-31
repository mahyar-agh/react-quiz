import { createContext, useContext, useEffect, useReducer } from "react";

const SECR_PER_QUESTION = 30;

const QuizProvider = createContext();

const initialState = {
  questions: [],

  // 'loading','error','ready','active','finished'
  status: "loading",
  step: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFetched":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECR_PER_QUESTION,
      };
    case "answer":
      const question = state.questions[state.step];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, step: state.step++, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          action.payload > state.highscore ? action.payload : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",

        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining--,
        status: state.secondsRemaining < 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unkown");
  }
}

function QuizContext({ children }) {
  const [
    { questions, status, step, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataFetched", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;
  const numPoints = questions.reduce(
    (acc, question) => question.points + acc,
    0
  );

  return (
    <QuizProvider.Provider
      value={{
        questions,
        status,
        step,
        answer,
        highscore,
        points,
        secondsRemaining,
        dispatch,
        numQuestions,
        numPoints,
      }}
    >
      {children}
    </QuizProvider.Provider>
  );
}

function useQuiz() {
  const quiz = useContext(QuizProvider);
  return quiz;
}

export { QuizContext, useQuiz };
