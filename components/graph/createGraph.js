import { run, runPartial, mergeBindings } from "@quri/squiggle-lang";


function miniReducer(obj, parentName) {
    let nodes = []
    let edges = []
    let bindings = [];

    let inputs = obj.inputs
    let fn = obj.fn

    for (let childName of Object.keys(inputs)) {
        if (typeof inputs[childName] == "string") {
            // Produce bindings
            let childBindingSquiggleStrings = `${childName} = ${inputs[childName]}`;
            let childBinding = runPartial(childBindingSquiggleStrings).value;
            bindings.push(childBinding);

            // Produce value
            let childValueSquiggleString = `${childBindingSquiggleStrings}
${childName}`
            let childResultValue = run(childValueSquiggleString)

            // Process value for node and edges
            if (childResultValue.tag == "Error") {
                return childResultValue
            } else {
                // Node
                let childNode = ({
                    tag: 'Ok',
                    id: childName,
                    value: childResultValue.value,
                    fn: inputs[childName]
                })
                nodes.push(childNode)

                // Edge
                let edge = ({
                    id: `${childName}->${parentName}`, // has to be unique
                    source: `${childName}`,
                    target: `${parentName}`,
                })
                edges.push(edge)
            }
        } else {
            // Produce data
            let childNodeOutput = miniReducer(inputs[childName], childName);
            if (childNodeOutput.tag == "Error") {
                return childNodeOutput
            } else {
                // Bindings
                bindings.push(childNodeOutput.binding)
                // Nodes from child node
                nodes.push(...childNodeOutput.nodes)
                // Edges from child node
                edges.push(...childNodeOutput.edges)

                /* Child node is included in the childNodeOutput.nodes
                let childNode = {
                    tag: 'Ok',
                    id: input,
                    value: childNodeOutput.value,
                    fn: inputs[childName].fn
                };
                nodes.push(childNode)
                */
                // Child edge
                let edge = ({
                    id: `${childName}->${parentName}`, // has to be unique
                    source: `${childName}`,
                    target: `${parentName}`,
                })
                edges.push(edge)
            }
        }
    }

    let parentBindingSquiggleString = `${parentName} = {
        ${fn}
}`;
    let parentResultSquiggleString = `${parentName} = {
        ${fn}
}
${parentName}`;
    let parentBinding = runPartial(
        parentBindingSquiggleString,
        mergeBindings(bindings)
    ).value;

    if (parentBinding.tag == "Error") {
        return parentBinding
    }

    let parentValue = run(parentResultSquiggleString, mergeBindings(bindings));
    if (parentValue.tag == "Error") {
        // console.log(bindings)
        return parentValue
    }

    let resultNode = ({
        tag: 'Ok',
        id: parentName,
        value: parentValue.value,
        fn: fn
    })

    nodes.push(resultNode)
    // console.log("resultNode", resultNode)
    let result = {
        ...resultNode,
        value: parentValue,
        binding: parentBinding,
        nodes: nodes,
        edges: edges
    };
    return (result);
}

export function createGraph() {

    let utility = {
        inputs: {
            productivity: {
                inputs: {
                    hours: `4 to 12`,
                    efficiency: `0.1 to 10`,
                },
                fn: `
                hours * efficiency
                `,
            },
        },
        fn: `
        x = 1 to 10
        r = productivity * (1 to 10) * x
        mean(r)`,
    };

    let reducerResult = miniReducer(utility, "utility");
    
    if (reducerResult.tag == "Error") {
        return reducerResult
    } else {
        // console.log("reducerResult", reducerResult)
        let {nodes, edges} = reducerResult
        let nodeElements = nodes.map(node => ({ data: { ...node, name: node.id} }))
        let edgeElements = edges.map(edge => ({ data: { ...edge, name: edge.id } }))
        let answer = { nodeElements, edgeElements }
        return answer
    }

    // return  { nodeElements: [], edgeElements: [] }
    /*
    
    */
    // return (resultUtility)

    // Then the rest should be doable without all that much work.
    // Some duplication of efforts, but I don't really care:
}

export function createGraph0() {
    let nodeElements = [
        {
            data: {
                id: "Total utility",
                squiggleString: "1 to 1000",
                formula: "now + soon + later"
            }
        },
        {
            data: {
                id: "now",
                squiggleString: "1 to 2",
                formula: "subjective estimation"
            },
        },
        {
            data: {
                id: "soon",
                squiggleString: "10 to 200",
                formula: "subjective estimation"
            },
        },
        {
            data: {
                id: "later",
                squiggleString: "1 to 500",
                formula: "subjective estimation"
            },
        },
        {
            data: {
                id: "discount rate",
                squiggleString: "0.001 to 0.03",
                formula: "subjective estimation"
            },
        },
        {
            data: {
                id: "return rate",
                squiggleString: "1 to 2"
            }
        },
    ]
    let edgeElements = [
        {
            data: {
                id: "link-1",
                source: "now",
                target: "Total utility",
            },
        },
        {
            data: {
                id: "link-2",
                source: "soon",
                target: "Total utility",
            },
        },
        {
            data: {
                id: "link-3",
                source: "later",
                target: "Total utility",
            },
        },
        {
            data: {
                id: "link-4",
                source: "discount rate",
                target: "later",
            },
        },
        {
            data: {
                id: "link-5",
                source: "return rate",
                target: "later",
            }
        },
    ]

    // 

    let squiggleInJs = ({

        displayName: "Total utility",
        varName: "utility",
        inputs: {

        },
        fn: ``
    })
    //
    return { nodeElements, edgeElements }
}