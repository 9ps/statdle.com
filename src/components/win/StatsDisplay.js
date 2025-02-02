import React from "react";

// props: stats
const StatsDisplay = ({ stats }) => {
  const winPercentage =
    Math.round(
      ((stats.played - stats.tally[0][0] - stats.tally[0][1]) * 100) /
        stats.played
    ) || "0";

  return (
    <>
      <h3 className="subtitle">Statistics</h3>
      <div className="stat__container">
        <div className="stat">
          <h3 className="stat__text">{stats.played || 0}</h3>
          <div className="stat__label">
            Games<br></br>Played
          </div>
        </div>
        <div className="stat">
          <h3 className="stat__text">{winPercentage}</h3>
          <div className="stat__label">
            Win<br></br>Percent
          </div>
        </div>
        <div className="stat">
          <h3 className="stat__text">{stats.streak.length || 0}</h3>
          <div className="stat__label">
            Current<br></br>Streak
          </div>
        </div>
        <div className="stat">
          <h3 className="stat__text">{stats.maxStreak || 0}</h3>
          <div className="stat__label">
            Max<br></br>Streak
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsDisplay;
