const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));


let shoppingList = [];


app.post('/items', (req, res) => {
  const { name, quantity } = req.body;
  const newItem = { id: shoppingList.length + 1, name, quantity };
  shoppingList.push(newItem);
  res.status(201).json(newItem);
});


app.get('/items', (req, res) => {
  res.status(200).json(shoppingList);
});


app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const item = shoppingList.find(item => item.id == id);

  if (item) {
    item.name = name;
    item.quantity = quantity;
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item não encontrado' });
  }
});



app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = shoppingList.findIndex(item => item.id == id);

  if (itemIndex > -1) {
    shoppingList.splice(itemIndex, 1);
    res.status(200).json({ message: 'Item deletado' });
  } else {
    res.status(404).json({ message: 'Item não encontrado' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

...
