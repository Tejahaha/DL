import torch
import torch.nn as nn
import torch.optim as optim
#
# inputs = torch.tensor([[0.0 , 0.0] , [0.0 , 1.0] ,
#                        [1.0 , 0.0] , [1.0 , 1.0]] , dtype=torch.float32)
#
# weights = torch.tensor([1.0 , 1.0])
#
# threshold = 2.0
#
# sums = inputs @ weights
#
# output = ( sums >= threshold).float()
#
#
# for out in output:
#     print(int(out.item()))
#
# input_vars = [
#     [0, 0],
#     [0, 1],
#     [1, 0],
#     [1, 1]
# ]
#
# weights = [1 , 1]
# thres = 1
#
# def activation(wSum , thres):
#     if wSum >= thres:
#         return 1
#     else:
#         return 0
#
#
# def calc(inp , W):
#     res = 0
#     for inpp , ww in zip(inp,W):
#         res += inpp*ww
#     return res
#
# for inps in input_vars:
#     w_Sum = calc(inps , weights)
#     out = activation(w_Sum, thres)
#     print(out)



#totally automated

input_vars = torch.tensor([
    [0.0 , 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0]
] , dtype=torch.float)


labels = torch.tensor([
    [0.0],[0.0],[0.0],[1.0]
] , dtype=torch.float)


model = nn.Sequential(
    nn.Linear(2, 1),
    nn.Sigmoid(),
)

loss = nn.BCELoss()
optimizer = optim.SGD(model.parameters(), lr=0.1)

for epoch in range(1000):
    output = model(input_vars)
    loss1 = loss(output, labels)
    optimizer.zero_grad()
    loss1.backward()
    optimizer.step()


with torch.no_grad():
    output = model(input_vars)
    prediction = (output >= 0.5).float()
    for out in prediction:
        print(int(out))