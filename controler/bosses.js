const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const getBosses = async (req, res) => {
  // This one has nothing to validate
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const client = new MongoClient(process.env.MONGODBURI);

    await client.connect();
    const database = await client.db('EldenRing').collection('Boss').find();
    const bossesArray = await database.toArray();
    await client.close();
    res.json(bossesArray);
  } catch (err) {
    res.status(500).json(err || 'Somehting went wrong while getting');
  }
};

const getBoss = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const id = new ObjectId(req.params.id);
    if (!id) {
      res.status(500).send({ message: 'Content can not be empty!' });
      return;
    }
    const client = new MongoClient(process.env.MONGODBURI);

    await client.connect();
    const database = await client.db('EldenRing').collection('Boss').find({ _id: id });
    let boss = await database.toArray();
    await client.close();
    res.json(boss);
  } catch (err) {
    res.status(400).json(err || 'Somehting went wrong while getting');
  }
};

const createBoss = async (req, res) => {
  try {
    if (
      !req.body.Name ||
      !req.body.Strengths ||
      !req.body.Weakneses ||
      !req.body.AttackType ||
      !req.body.Parryable ||
      !req.body.StanceBreakable ||
      !req.body.Critical
    ) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const boss = {
      Name: req.body.Name,
      Strengths: req.body.Strengths,
      Weakneses: req.body.Weakneses,
      AttackType: req.body.AttackType,
      Parryable: req.body.Parryable,
      StanceBreakable: req.body.StanceBreakable,
      Critical: req.body.Critical
    };

    const client = new MongoClient(process.env.MONGODBURI);
    const response = await client.db('EldenRing').collection('Boss').insertOne(boss);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Something went wrong when adding the boss');
    }
  } catch {
    res.status(500).json('Somehting went wrong during creation');
  }
};

const updateBoss = async (req, res) => {
  try {
    if (
      !req.body.Name ||
      !req.body.Strengths ||
      !req.body.Weakneses ||
      !req.body.AttackType ||
      !req.body.Parryable ||
      !req.body.StanceBreakable ||
      !req.body.Critical
    ) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const id = new ObjectId(req.params.id);

    const boss = {
      Name: req.body.Name,
      Strengths: req.body.Strengths,
      Weakneses: req.body.Weakneses,
      AttackType: req.body.AttackType,
      Parryable: req.body.Parryable,
      StanceBreakable: req.body.StanceBreakable,
      Critical: req.body.Critical
    };
    const client = new MongoClient(process.env.MONGODBURI);
    await client.connect();
    const response = await client.db('EldenRing').collection('Boss').replaceOne({ _id: id }, boss);
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

const deleteBoss = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    if (!id) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const client = new MongoClient(process.env.MONGODBURI);
    await client.connect();
    const response = await client.db('EldenRing').collection('Boss').deleteOne({ _id: id });
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

module.exports = { getBosses, getBoss, createBoss, updateBoss, deleteBoss };
