function Option({ question, dispatch, answer }) {
  const hasAwnsered = answer !== null;

  function handleClick(index) {
    dispatch({ type: "answer", payload: index });
  }

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAwnsered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAwnsered}
          onClick={() => handleClick(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
