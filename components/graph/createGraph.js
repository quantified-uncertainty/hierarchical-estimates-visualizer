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
        return parentValue
    }

    let resultNode = ({
        tag: 'Ok',
        id: parentName,
        value: parentValue.value,
        fn: fn,
        binding: parentBinding
    })

    nodes.push(resultNode)
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
                fn: `hours * efficiency`,
            },
        },
        fn: `x = 1 to 10
r = productivity * (1 to 10) * x
mean(r)`,
    };

    let reducerResult = miniReducer(utility, "utility");
    
    if (reducerResult.tag == "Error") {
        return reducerResult
    } else {
        let {nodes, edges} = reducerResult
        let nodeElements = nodes.map(node => ({ data: { ...node, name: node.id} }))
        let edgeElements = edges.map(edge => ({ data: { ...edge, name: edge.id } }))
        let answer = { nodeElements, edgeElements }
        return answer
    }
}
