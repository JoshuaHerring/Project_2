const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const getItems = async (req, res) => {
  // This one has nothing to validate
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const client = new MongoClient(process.env.MONGODBURI);

    await client.connect();
    const database = await client.db('EldenRing').collection('Item').find();
    const itemsArray = await database.toArray();
    await client.close();
    res.json(itemsArray);
  } catch (err) {
    res.status(500).json(err || 'Somehting went wrong while getting');
  }
};

const getItem = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const id = new ObjectId(req.params.id);
    if (!id) {
      res.status(500).send({ message: 'Content can not be empty!' });
      return;
    }
    const client = new MongoClient(process.env.MONGODBURI);

    await client.connect();
    const database = await client.db('EldenRing').collection('Item').find({ _id: id });
    let boss = await database.toArray();
    await client.close();
    res.json(boss);
  } catch (err) {
    res.status(400).json(err || 'Somehting went wrong while getting');
  }
};

const createItem = async (req, res) => {
  try {
    if (
      !req.body.WeaponType ||
      !req.body.Name ||
      !req.body.AttackType ||
      !req.body.Scaling ||
      !req.body.Requires
    ) {
      console.log('Pain');
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const item = {
      WeaponType: req.body.WeaponType,
      Name: req.body.Name,
      AttackType: req.body.AttackType,
      Scaling: req.body.Scaling,
      Requires: req.body.Requires
    };

    const client = new MongoClient(process.env.MONGODBURI);
    const response = await client.db('EldenRing').collection('Item').insertOne(item);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Something went wrong when adding the boss');
    }
  } catch {
    res.status(500).json('Somehting went wrong during creation');
  }
};

const updateItem = async (req, res) => {
  try {
    if (
      !req.body.WeaponType ||
      !req.body.Name ||
      !req.body.AttackType ||
      !req.body.Scaling ||
      !req.body.Requires
    ) {
      console.log('Pain');
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const id = new ObjectId(req.params.id);

    const item = {
      WeaponType: req.body.WeaponType,
      Name: req.body.Name,
      AttackType: req.body.AttackType,
      Scaling: req.body.Scaling,
      Requires: req.body.Requires
    };

    const client = new MongoClient(process.env.MONGODBURI);
    await client.connect();
    const response = await client.db('EldenRing').collection('Item').replaceOne({ _id: id }, item);
    await client.close();

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Somehting went wrong while editing the boss');
    }
  } catch (err) {
    res.status(500).json(err || 'Somehting went wrong while editing');
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    if (!id) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const client = new MongoClient(process.env.MONGODBURI);
    await client.connect();
    const response = await client.db('EldenRing').collection('Item').deleteOne({ _id: id });
    await client.close();

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Something went wrong while deleting the contact');
    }
  } catch (err) {
    res.status(500).json(err || 'Somehting went wrong while deleting');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
