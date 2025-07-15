from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split #For Training and Testing split
from sklearn.preprocessing import StandardScaler #For Normalization
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset #Dirctly load DataSet From Pytorch
import matplotlib.pyplot as plt
import numpy as np
#Load Dataset
digits=load_digits()
#Dataset attributes
x=digits.images #Images
y=digits.target #Labels
#visualize some images
fig, axes = plt.subplots(1,50,figsize=(15,4))
for i, ax in enumerate(axes): #enumerate function: we can use 2 variables in a for loop at a time
    ax.imshow(x[i],cmap='gray')
    ax.set_title(f'Label:{y[i]}')
    ax.axis('off')
plt.show()
print(x.shape,x[2],y[4])
#Scale data to range [0,1] and exand dimensions for CNN
x=x/16.0 #Normalize (max pixel valiue is 16), for real images /255(max(x))
x=np.expand_dims(x,axis=1) #Add Channel dimensions(N,1,8,8)
print(x.shape)
#Split the data in to train and test
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=42)
#convert to pytorch tensor
x_train,x_test=torch.tensor(x_train,dtype=torch.float32),torch.tensor(x_test,dtype=torch.float32)
y_train,y_test=torch.tensor(y_train,dtype=torch.long),torch.tensor(y_test,dtype=torch.long)
print(x_train.shape,y_train.shape)
#create data loader objects
train_dataset=TensorDataset(x_train,y_train)
test_dataset=TensorDataset(x_test,y_test)
train_loader=DataLoader(train_dataset,batch_size=32,shuffle=True)
test_loader=DataLoader(test_dataset,batch_size=32,shuffle=False)
#build the CNN mode for classification
class CNN(nn.Module):
    def __init__(self):
        super(CNN,self).__init__()
        self.conv1=nn.Conv2d(1,16,kernel_size=3,stride=1,padding=1)
        self.conv2=nn.Conv2d(16,32,kernel_size=3,stride=1,padding=1)
        self.pool=nn.MaxPool2d(2,2)
        self.fc1=nn.Linear(32*4*4,128)
        self.fc2=nn.Linear(128,10)
        self.relu=nn.ReLU()
        self.dropout=nn.Dropout(0.5)
    def forward(self,x):
        x=self.relu(self.conv1(x))
        x=self.pool(self.relu(self.conv2(x)))
        x=x.view(x.size(0),-1)
        x=self.relu(self.fc1(x))
        a=self.dropout(x)
        x=self.fc2(x)
        return x
model=CNN()
print(model)
critereon=nn.CrossEntropyLoss()
optimizer=optim.Adam(model.parameters(),lr=0.001)
num_epochs=10
for epoch in range(num_epochs):
    model.train()
    running_loss=0.0
    for images,labels in train_loader:
        outputs=model(images)
        loss=critereon(outputs,labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        running_loss+=loss.item()
        # if (i+1)%100==0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Step [{i+1}/{len(train_loader)}], Loss: {loss.item()}')