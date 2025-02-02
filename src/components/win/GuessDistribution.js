import React from "react";
import Plot from "react-plotly.js";

// props: stats
const GuessDistribution = ({ tally, played, currentScore }) => {
  if (played === 0) {
    return;
  }

  const shiftedTally = [...tally.slice(1), tally[0]];

  const noHintTally = shiftedTally.map((arr) => arr[0]);
  const hintTally = shiftedTally.map((arr) => arr[1]);

  const highlightNoHint = Array(11).fill("#35277c");
  const highlightHint = Array(11).fill("#af1d5c");

  if (currentScore !== undefined) {
    highlightNoHint[currentScore - 1] = "#503bba";
    highlightHint[currentScore - 1] = "#dd317c";
  }

  return (
    <>
      <h3 className="subtitle">Score History</h3>
      <div className="plot__container">
        <Plot
          className="plot"
          data={[
            {
              marker: {
                color: highlightNoHint,
              },
              type: "bar",

              x: noHintTally,
              text: noHintTally,
              texttemplate: "%{text} ",
              y: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "X"], //%0 to 10\
              textangle: 0,
              orientation: "h",
              title: "Guess Distribution",
              name: "w/o hints",
              hoverinfo: "skip",
            },

            {
              marker: {
                color: highlightHint,
              },
              type: "bar",

              x: hintTally,
              text: hintTally,
              texttemplate: "%{text} ",
              y: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "X"], //%0 to 10\
              textangle: 0,
              orientation: "h",
              title: "Guess Distribution",
              name: "w/ hints",
              hoverinfo: "skip",
            },
          ]}
          config={{
            displayModeBar: false,
            responsive: false,
            staticPlot: true,
          }}
          layout={{
            barmode: "stack",
            width: 320,
            height: 320,
            plot_bgcolor: "#25292d",
            paper_bgcolor: "rgba(0,0,0,0)",
            font: {
              size: 14,
              family: "IBM Plex Mono",
            },

            showlegend: true,
            legend: {
              font: { size: 12, family: "IBM Plex Mono", color: "#adb5bd" },
              orientation: "h",
              x: 0,
              y: 0,
            },

            margin: {
              t: 10,
              b: 10,
              l: 40,
              r: 0,
            },
            yaxis: {
              // dtick: 1,
              type: "category",
              fixedrange: true,
              color: "#CED4DA",
              autorange: "reversed",
              ticksuffix: " ",
            },
            xaxis: {
              showgrid: false,
              zeroline: false,
              showline: false,
              showticklabels: false,
              fixedrange: true,
            },
          }}
        />
      </div>
    </>
  );
};

export default GuessDistribution;
