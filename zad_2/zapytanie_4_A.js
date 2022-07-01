printjson(db.people.aggregate([
    {$group:{
        _id:"$nationality",
        count : { $sum : 1 },
        avgBMI:{
            $avg:{
               $divide:[
                   {$convert:{input:"$weight",to:"decimal",onNull:0.0}},
                   {$pow:[{$divide:[{$convert:{input:"$height",to:"decimal",onNull:0.0}},100]} , 2]}
               ]
            }
        },
        minBMI:{
            $min:{
               $divide:[
                   {$convert:{input:"$weight",to:"decimal",onNull:0.0}},
                   {$pow:[{$divide:[{$convert:{input:"$height",to:"decimal",onNull:0.0}},100]} , 2]}
               ]
            }
        },
        maxBMI:{
            $max:{
                $divide:[
                    {$convert:{input:"$weight",to:"decimal",onNull:0.0}},
                    {$pow:[{$divide:[{$convert:{input:"$height",to:"decimal",onNull:0.0}},100]} , 2]}
                ]
            }
        }
    }},
    {$sort:{_id:1}}
]).toArray())