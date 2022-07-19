import React, { useState, useEffect } from "react";
// import { SquiggleChart } from "@quri/squiggle-components";

import dynamic from "next/dynamic";

const SquiggleChart = dynamic(
  () => import("@quri/squiggle-components").then((mod) => mod.SquiggleChart),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SquiggleEditor = dynamic(
  () => import("@quri/squiggle-components").then((mod) => mod.SquiggleEditor),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
); 
// ^ works, but updating the editor content from the outside would be tricky.
// and so instead we are hacking our own mini-editor.

const effectButtonStyle =
  "bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5";

const countNumberOfLines = string => {
  return string.split("\n").length
}

export function DynamicSquiggleChart({ element, stopShowing }) {
  const initialEditorState = !!element ? element.fn : ""
  const [editorState, setEditorState] = useState(initialEditorState)
  useEffect(() => {
    if (!!element && element.fn != "") {
      setEditorState(element.fn)
    }
  }, [element]);
  if (element == null) {
    return "";
  } else {
    let usefulElement = {
      name: element.id,
      squiggleString: element.fn,
      binding: element.binding || null
    };
    return (
      <div className="">
        <div className="bg-white p-8">
          <h3 className="text-2xl font-bold mb-4">{usefulElement.name}</h3>
          <textarea
            value={editorState}
            onChange={(event) => setEditorState(event.target.value)}
            // disabled={true}
            rows={countNumberOfLines(editorState) + 1}
            cols={30}
            className="text-left text-gray-600 bg-white rounded text-normal p-5 border-0 shadow outline-none focus:outline-none focus:ring"
          />
          <SquiggleChart
            squiggleString={editorState}
            width={500}
            height={200}
            bindings={usefulElement.binding}
            showSummary={true}
            showTypes={true}
          />

        </div>
        <button className={effectButtonStyle} onClick={() => stopShowing()}>
          Hide chart
        </button>
      </div>
    );
  }
}
