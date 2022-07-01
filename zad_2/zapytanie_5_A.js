printjson(db.people.aggregate([
    {$match:{sex:"Female",nationality:"Poland"}},
    {$unwind:"$credit"},
    {$group:{
        _id:"$credit.currency",
        sumBalance:{
            $sum: {$convert:{input:"$credit.balance",to:"decimal",onNull:0.0}},
        },
        avgBalance:{
            $avg:{$convert:{input:"$credit.balance",to:"decimal",onNull:0.0}}
        },
        count:{
            $sum:1
        }
    }}
]).toArray())