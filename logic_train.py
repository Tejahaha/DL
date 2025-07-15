import torch
import torch.nn as nn
import torch.optim as optim

def run_trained_model():
    input_vars = torch.tensor([
        [0.0, 0.0],
        [0.0, 1.0],
        [1.0, 0.0],
        [1.0, 1.0]
    ], dtype=torch.float32)

    labels = torch.tensor([
        [0.0],
        [0.0],
        [0.0],
        [1.0]
    ], dtype=torch.float32)

    model = nn.Sequential(
        nn.Linear(2, 1),
        nn.Sigmoid()
    )

    loss_fn = nn.BCELoss()
    optimizer = optim.SGD(model.parameters(), lr=0.1)

    for epoch in range(1000):
        output = model(input_vars)
        loss = loss_fn(output, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    with torch.no_grad():
        output = model(input_vars)
        prediction = (output >= 0.5).float()
        outputs = [int(o.item()) for o in prediction]

        correct = (prediction == labels).sum().item()
        total = labels.size(0)
        accuracy = f"{(correct / total) * 100:.0f}%"

    weights = model[0].weight.detach().numpy().tolist()[0]
    bias = model[0].bias.detach().numpy().tolist()

    return {
        "type": "PyTorch Gradient Descent",
        "gate": "AND (trained)",
        "outputs": outputs,
        "weights": weights,
        "bias": bias,
        "accuracy": accuracy
    }
