def run_basic_logic():
    input_vars = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ]

    weights = [1, 1]
    thres = 1

    def activation(wSum, thres):
        return 1 if wSum >= thres else 0

    def calc(inp, W):
        return sum(inpp * ww for inpp, ww in zip(inp, W))

    outputs = []
    for inps in input_vars:
        w_Sum = calc(inps, weights)
        outputs.append(activation(w_Sum, thres))

    return {
        "type": "Manual Python Logic Gate",
        "gate": "OR (threshold 1, weights [1,1])",
        "outputs": outputs,
        "weights": weights,
        "threshold": thres,
        "accuracy": "100%"  # Hardcoded for this static case
    }
