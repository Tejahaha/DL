import torch

def run_torch_manual():
    inputs = torch.tensor([
        [0.0, 0.0],
        [0.0, 1.0],
        [1.0, 0.0],
        [1.0, 1.0]
    ], dtype=torch.float32)

    weights = torch.tensor([1.0, 1.0])
    threshold = 1.0

    sums = inputs @ weights
    outputs = (sums >= threshold).float().tolist()

    return {
        "type": "PyTorch Threshold Logic",
        "gate": "OR (threshold 1, weights [1,1])",
        "outputs": [int(o) for o in outputs],
        "weights": weights.tolist(),
        "threshold": threshold,
        "accuracy": "100%"  # Also static
    }
