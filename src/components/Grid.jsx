import { useEffect, useState } from "react";
import { writingChallenge } from "../utils";
import WritingCard from "./WritingCard";

export default function Grid() {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [savedChallenges, setSavedChallenges] = useState(null);
  const completedChallenges = Object.keys(savedChallenges || {}).filter(
    (val) => {
      const record = savedChallenges[val];
      return record.isComplete;
    }
  );

  function handleSave(index, data) {
    const newObj = {
      ...savedChallenges,
      [index]: {
        ...(savedChallenges?.[index] || {}),
        ...data,
        isComplete: !!data.isComplete || !!savedChallenges?.[index]?.isComplete,
      },
    };
    setSavedChallenges(newObj);
    localStorage.setItem("clearMode", JSON.stringify(newObj));
    setSelectedChallenge(null);
  }

  function handleComplete(index, data) {
    const newObj = {
      ...data,
    };
    newObj.isComplete = true;
    handleSave(index, newObj);
  }

  useEffect(() => {
    //gaurd caluse
    if (!localStorage) {
      return;
    }
    let savedData = {};

    if (localStorage.getItem("clearMode")) {
      savedData = JSON.parse(localStorage.getItem("clearMode"));
    }
    setSavedChallenges(savedData);
  }, []);

  return (
    <div className="writing-plan-grid">
      {Object.keys(writingChallenge).map((writing, writingIndex) => {
        const entry = writingChallenge[writing];
        const dayNumber = writingIndex + 1;
        const formattedDay = dayNumber < 10 ? `0${dayNumber}` : dayNumber;
        const isLocked =
          writingIndex === 0
            ? false
            : !completedChallenges.includes(`${writingIndex - 1}`);

        if (writingIndex === selectedChallenge) {
          return (
            <WritingCard
              key={writingIndex}
              entry={entry}
              writingIndex={writingIndex}
              formattedDay={formattedDay}
              savedEssay={savedChallenges?.[writingIndex]?.essay?.[entry.title]}
              handleSave={handleSave}
              handleComplete={handleComplete}
            />
          );
        }

        return (
          <button
            onClick={() => {
              if (isLocked) {
                return;
              }
              setSelectedChallenge(writingIndex);
            }}
            className={"card plan-card " + (isLocked ? " inactive " : " ")}
            key={writingIndex}
          >
            <div className="plan-card-header">
              <p>Day {formattedDay}</p>

              {isLocked ? (
                <i className="fa-solid fa-book"></i>
              ) : (
                <i className="fa-solid fa-marker"></i>
              )}
            </div>
            <div className="plan-card-header">
              <h4>
                <b>
                  <i>{entry.tags[0]}</i>
                </b>
              </h4>
            </div>
          </button>
        );
      })}
    </div>
  );
}
