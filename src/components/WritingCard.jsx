import { useEffect, useState } from "react";
import { handleWordCount } from "../utils";
import Modal from "./Modal";
import { writingPromptsDetails } from "../utils";

export default function WritingCard(props) {
  const {
    writingIndex,
    entry,
    formattedDay,
    savedEssay,
    handleSave,
    handleComplete,
  } = props;

  const [showWritingPromptsDetails, setShowWritingPromptsDetails] =
    useState(null);
  const [essay, setEssay] = useState(
    savedEssay ? { [entry.title]: savedEssay } : {}
  );
  const [wordCount, setWordCount] = useState(0);
  const [goalStatus, setGoalStatus] = useState({ text: "", color: "" });

  function handleTextChange(e) {
    const value = e.target.value;
    handleAddEssay(entry.title, value);
    handleWordCount(value, writingIndex, setGoalStatus, setWordCount);
  }

  function handleAddEssay(title, content) {
    setEssay((prevEssay) => ({
      ...prevEssay,
      [title]: content,
    }));
  }

  useEffect(() => {
    const currentEssay = essay[entry.title] || "";
    handleWordCount(currentEssay, writingIndex, setGoalStatus, setWordCount);
  }, [entry.title, essay, writingIndex]);

  return (
    <div className="writing-container">
      {showWritingPromptsDetails && (
        <Modal
          showWritingPromptsDetails={showWritingPromptsDetails}
          handleCloseModal={() => {
            setShowWritingPromptsDetails(null);
          }}
        />
      )}
      <div className="writing-card card">
        <div className="plan-card-header">
          <p>Day {formattedDay}</p>
          <i className="fa-solid fa-marker"></i>
        </div>
        <div className="plan-card-header">
          <h2>
            <b>
              <i>Title: {entry.title}</i>
            </b>
          </h2>
        </div>
      </div>

      <div>
        <div className="prompt-name">
          <h4>{entry.prompt}</h4>
          <button
            onClick={() => {
              const details = writingPromptsDetails[entry.title];
              if (details) {
                setShowWritingPromptsDetails({
                  title: entry.title,
                  hint: details.hint,
                  example: details.example,
                  tone: details.tone,
                });
              }
            }}
            className="help-icon"
          >
            <i className="fa-solid fa-lightbulb"></i>
          </button>
        </div>
        <p className="goal-text">
          <strong>Goal:</strong> {entry.goal.wordCount} words –{" "}
          {entry.goal.timeEstimate}
        </p>
        <p>
          <strong>Tags:</strong> {entry.tags.join(", ")}
        </p>
      </div>

      <div>
        <textarea
          id="writingInput"
          rows="15"
          placeholder="Start writing here..."
          value={essay[entry.title] || ""}
          onChange={handleTextChange}
        ></textarea>
        <p>
          Words: {wordCount} / {entry.goal.wordCount}
        </p>
        <span style={{ color: goalStatus.color }}>{goalStatus.text}</span>
      </div>
      <div className="writing-buttons">
        <button
          onClick={() => {
            handleSave(writingIndex, { essay });
          }}
        >
          Save & Exit
        </button>
        <button
          onClick={() => {
            handleComplete(writingIndex, { essay });
          }}
          disabled={goalStatus.text !== "– Great!"}
        >
          Complete
        </button>
      </div>
    </div>
  );
}
