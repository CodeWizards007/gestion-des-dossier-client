const Constat= require('../models/Constats.model');
const mongoose = require("mongoose");

// Create and Save a new Constat
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Constat
    const constat = new Constat({
        titre: req.body.titre,
        montant: req.body.montant,
        status: req.body.status,
        emplacement: req.body.emplacement,
        fautif:req.body.fautif,
        expertId:req.body.expertId,
        responsableId:req.body.responsableId,
        clientId:req.body.clientId,
        devis:[req.body.devis],
        agence:req.body.agence,
        images:[req.body.images],
    });

    // Save Constat in the database
    Constat.create(constat, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Constat."
            });
        else res.send(data);
    });
}


// Retrieve all Constats from the database.
exports.findAll = (req, res) => {
    Constat.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving constats."
            });
        else res.send(data);
    });
}


//delete  constat
exports.deleteConstat = (req, res) => {
    Constat.deleteOne(req.params.id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all constats."
            });
        else res.send({ message: `constat were deleted successfully!` });
    });
}


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Constat.updateOne(
        {_id:req.params.id},
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Constat with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Constat with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
}