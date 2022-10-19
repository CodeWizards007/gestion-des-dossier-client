const mongoose = require("mongoose");


const ConstatsSchema = mongoose.Schema({
fautif:{
    type:String,
    Enum:["fautif","non-fautif"],
    required:true,
},
 dateAccidents:{
    type:Date,
     default:Date.now()
 },
 emplacement:{
        gouvernement:{
            type:String,
            required:true
        },
        cite:{
          type:String,
            required:true
        },
         rue:{
            type:String,
         }
 },
 rapport:{   // dedié au expert
  type:String,
  },
    montantRembourse:{ // dedié au expert
    type:Number,
    },
    statusRembourssement:{ // dedié au responsable
    type:String,
    enum:["En attente","Remboursé","Non remboursé"],
    default:"En attente"
    },
    agence:{
    type:String,
    },
    images:[
        {
            type:String,
        }
    ],
    devis:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Devis"
    }],
    expertId:{
    type:Number,
    required:true
    },
    responsableId:{
       type:Number,
        required:true
    },
    clientId:{
        type:Number,
        required:true
    }
}, {timestamps:true});


const Constat = mongoose.model("Constat", ConstatsSchema);

module.exports = Constat;