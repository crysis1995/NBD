printjson(db.people.aggregate([
    {$group:{_id:"$job"}},
    {$sort:{_id:1}},
]).map(e => e._id))