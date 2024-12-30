import React from "react";
import Plot from "react-plotly.js";

// props: stats
const GuessDistribution = ({ tally, played, currentScore }) => {
  const shiftedTally = [...tally.slice(1), tally[0]];
  const highlight = Array(11).fill("#41309A");
  const percentTally = shiftedTally.map(
    (num) => Math.round((num * 100) / played) + "%"
  );
  if (currentScore !== undefined) {
    highlight[currentScore - 1] = "#D3226F";
  }
  if (played === 0) {
    return;
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
                color: highlight,
              },
              type: "bar",

              x: shiftedTally,
              text: shiftedTally,
              texttemplate: "%{text} ",
              y: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "X"], //%0 to 10\
              customdata: percentTally,
              hovertemplate: "%{customdata}<extra></extra>",
              textangle: 0,
              orientation: "h",
              title: "Guess Distribution",
            },
          ]}
          config={{
            displayModeBar: false,
            responsive: true,
            staticPlot: false,
          }}
          layout={{
            width: 320,
            height: 320,
            plot_bgcolor: "#25292d",
            paper_bgcolor: "rgba(0,0,0,0)",
            font: {
              size: 14,
              family: "IBM Plex Mono",
            },

            showlegend: false,
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

            hoverlabel: {
              bgcolor: "#35277C",
              bordercolor: "#35277C",
              font: {
                size: 14,
                family: "IBM Plex Mono",
                color: "#CED4DA",
              },
            },
            barcornerradius: 5,
          }}
        />
      </div>
    </>
  );
};

export default GuessDistribution;
