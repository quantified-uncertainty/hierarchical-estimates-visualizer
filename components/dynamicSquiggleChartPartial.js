import React from "react";
// import { SquiggleChart } from "@quri/squiggle-components";

import dynamic from "next/dynamic";

const SquiggleChart = dynamic(
  () => import("@quri/squiggle-components").then((mod) => mod.SquiggleChart),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
/*
const SquiggleChart = dynamic(
  () => import("@quri/squiggle-components").then((mod) => mod.SquiggleChart),
  {
    suspense: true,
    ssr: false,
  }
);
*/

const effectButtonStyle =
  "bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5";

export function DynamicSquiggleChart({ element, stopShowing }) {
  if (element == null) {
    return "";
  } else {
    let usefulElement = {
      name: element.id,
      squiggleString: element.fn,
      formula: element.formula
    };
    return (
      <div className="">
        <h3 className="text-2xl font-bold mb-5">{usefulElement.name}</h3>
        <textarea
          value={JSON.stringify(usefulElement, null, 4)}
          //onChange={handleChange}
          disabled={true}
          rows={JSON.stringify(usefulElement, null, 4).split("\n").length}
          cols={37}
          className="text-left text-gray-600 bg-white rounded text-normal p-6  border-0 shadow outline-none focus:outline-none focus:ring mb-4"
        />
        <SquiggleChart
          squiggleString={element.squiggleString}
          width={500}
          height={200}
          showSummary={true}
          showTypes={true}
        />
        {/*
            SquiggleChart props:
            squiggleString?: string;
            sampleCount?: number;
            environment?: environment;
            chartSettings?: FunctionChartSettings;
            onChange?(expr: squiggleExpression): void;
            width?: number;
            height?: number;
            bindings?: bindings;
            jsImports?: jsImports;
            showSummary?: boolean;
            showTypes?: boolean;
            showControls?: boolean;
        */}

        <button className={effectButtonStyle} onClick={() => stopShowing()}>
          Hide chart
        </button>
      </div>
    );
  }
}
