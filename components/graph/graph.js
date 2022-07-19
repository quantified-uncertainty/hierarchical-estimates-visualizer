import React, { useRef, useState, useEffect } from "react";
import cytoscape from "cytoscape";
import dagre from 'cytoscape-dagre';
import { DynamicSquiggleChart } from "../dynamicSquiggleChart.js";
import { createGraph } from "./createGraph"

export function Graph({ }) {
    const containerRef = useRef("hello-world");
    const [cs, setCs] = useState(null); 
    const [selectedElement, setSelectedElement] = useState(null);
    const [selectedElementTimeout, setSelectedElementTimeout] = useState(null);
    const graphInit = createGraph()
    const [nodeElements, setNodeElements] = useState(graphInit.nodeElements)
    const [edgeElements, setEdgeElements] = useState(graphInit.edgeElements)

    cytoscape.use(dagre);

    let callEffect = () => {

        const cytoscapeStylesheet = [
            {
                selector: "node",
                style: {
                    padding: "10px",
                    shape: "round-rectangle",
                    content: "data(id)",
                    "background-color": "darkblue",//"data(color)",
                    "text-wrap": "wrap",
                    "text-max-width": 40,
                    "z-index": 1,
                },
            },
            {
                selector: "node[id]",
                style: {
                    label: "data(id)",
                    "font-size": "9",
                    color: "white",//"data(labelColor)",
                    "text-halign": "center",
                    "text-valign": "center",
                    "z-index": 1,
                },
            },
            {
                selector: "edge",
                style: {
                    "curve-style": "unbundled-bezier",
                    "target-arrow-shape": "vee",
                    width: 1.5,
                    "target-arrow-color": "darkblue",
                    "arrow-scale": 1.3,
                    "lineColor": "darkblue",
                    "target-arrow-fill": "filled",
                    "text-rotation": "autorotate",
                    "z-index": 0,
                },
            },
            {
                selector: "edge[label]",
                style: {
                    label: "data(label)",
                    "font-size": "9",

                    "text-background-color": "#f9f9f9",
                    "text-background-opacity": 1,
                    "text-background-padding": "3px",

                    "text-border-color": "black",
                    "text-border-style": "solid",
                    "text-border-width": 0.5,
                    "text-border-opacity": 1,
                    "z-index": 3,
                },
            },
        ];

        let { nodeElements, edgeElements } = createGraph();
        setNodeElements(nodeElements)
        setEdgeElements(edgeElements)

        const config = {
            container: containerRef.current,
            style: cytoscapeStylesheet,
            elements: [...nodeElements, ...edgeElements],
            layout: {
                name: "dagre", // circle, grid, dagre
                minDist: 20,
                rankDir: "BT",
                // prelayout: false,
                // animate: false, // whether to transition the node positions
                // animationDuration: 250, // duration of animation in ms if enabled
                // the cytoscape documentation is pretty good here.
            },
            userZoomingEnabled: false,
            userPanningEnabled: false,
        };

        let newCs = cytoscape(config);
        setCs(newCs);
        // cy.layout({ name: 'dagre', rankDir: "BT"}).run()

        // setTimeout(() => setVisibility(""), 700);
        // necessary for themes like spread, which have
        // a confusing animation at the beginning

    };
    useEffect(() => {
        callEffect({
        });
    }, [selectedElement]);

    useEffect(() => {
        if (cs != null) {
            setTimeout(() => {
                /*
                cs.edges().on("click", (event) => {
                    clearTimeout(selectedElementTimeout);
                    let edge = event.target;
                    console.log(JSON.stringify(edge.json()));
                    let newTimeout = setTimeout(() => {
                        let 
                        setSelectedElement(JSON.parse(JSON.stringify(edge.json())).data)
                    });
                    setSelectedElementTimeout(newTimeout)
                });*/
                cs.nodes().on("click", (event) => {
                    clearTimeout(selectedElementTimeout);
                    let node = event.target;
                    // console.log(JSON.stringify(node.json()));
                    let newTimeout = setTimeout(() => {
                        let selectedElementIncomplete = (JSON.parse(JSON.stringify(node.json())).data)
                        let selectedElementName = selectedElementIncomplete.name
                        let selectedElementInFull = nodeElements.filter(node => node.data.name == selectedElementName)
                        // console.log("selectedElementInFull", selectedElementInFull)
                        if(selectedElementInFull.length == 1){
                            let elementToBeSelected = selectedElementInFull[0]
                            // console.log("elementToBeSelected", elementToBeSelected)
                            setSelectedElement(elementToBeSelected.data)
                        }
                    });
                    setSelectedElementTimeout(newTimeout)
                });

            }, 100)
        }
    }, [cs]);

    return (
        <div className="grid place-items-center">
            <div
                className={
                    `grid grid-cols-${selectedElement == null ? "1 " : "2"
                    }
                    place-items-center place-self-center space-x-0 w-10/12 `
                }
            >
                <div
                    ref={containerRef}
                    style={{
                        height: "900px",
                        width: "900px", 
                    }}
                    className=""
                />
                <DynamicSquiggleChart
                    element={selectedElement}
                    stopShowing={() => setSelectedElement(null)}
                />

            </div>

        </div>
    );

}