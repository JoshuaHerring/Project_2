const {json} = require("express");
const {MongoClient} = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const getBosses = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const client = new MongoClient(process.env.MONGODBURI);

    await client.connect();
    const database = await client.db("EldenRing").collection("Boss").find();
    const bossesArray = await database.toArray();
    await client.close();
    res.json(bossesArray);
}

const getBoss = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const id = new ObjectId(req.params.id);
    const client = new MongoClient(process.env.MONGODBURI);

    await client.connect();
    const database = await client.db("EldenRing").collection("Boss").find({_id: id});
    let boss = await database.toArray();
    await client.close();
    res.json(boss);
}

const createBoss = async (req, res) => {
    const boss = {
        Name: req.body.Name,
        Strengths: req.body.Strengths,
        Weakneses: req.body.Weakneses,
        AttackType: req.body.AttackType,
        Parryable: req.body.Parryable,
        StanceBreakable: req.body.StanceBreakable,
        Critical: req.body.Critical
    }

    const client = new MongoClient(process.env.MONGODBURI);
    const response = await client.db("EldenRing").collection("Boss").insertOne(boss);

    if (response.acknowledged){
        res.status(201).json(response);
    }
    else{
        res.status(500).json(response.error || "Something went wrong when adding the boss")
    }
};

const updateBoss = async (req, res) => {
    const id = new ObjectId(req.params.id);

    const boss = {
        Name: req.body.Name,
        Strengths: req.body.Strengths,
        Weakneses: req.body.Weakneses,
        AttackType: req.body.AttackType,
        Parryable: req.body.Parryable,
        StanceBreakable: req.body.StanceBreakable,
        Critical: req.body.Critical
    }

    const client = new MongoClient(process.env.MONGODBURI);
    await client.connect();
    const response = await client.db("EldenRing").collection("Boss").replaceOne({_id: id}, boss);
    await client.close();

    if(response.modifiedCount > 0){
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || "Somehting went wrong while editing the boss");
    }
};

const deleteBoss = async (req, res) => {
    const id = new ObjectId(req.params.id);

    const client = new MongoClient(process.env.MONGODBURI);
    await client.connect();
    const response = await client.db("EldenRing").collection("Boss").deleteOne({_id: id});
    await client.close();

    if(response.deletedCount > 0){
        res.status(200).send()
    }
    else{
        res.status(500).json(response.error || "Something went wrong while deleting the contact");
    }
};


module.exports = {getBosses, getBoss, createBoss, updateBoss, deleteBoss}