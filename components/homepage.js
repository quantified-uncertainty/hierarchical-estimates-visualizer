import React, { useState } from "react";

import { Title } from "./title.js";
import { Graph } from "./graph/graph.js";


export function Homepage({ listOfElementsInit }) {

  return (
    <div className="block w-full items-center sm:w-full mt-10">
      <Title />
      <Graph/>
    </div>
  );
}
