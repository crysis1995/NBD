var map = function(){
    var key = this.job
    emit(key,null)
}
var reduce = function(key,values){
    return null
}


db.people.mapReduce(map,reduce,{out:"uniqueJobs"})

printjson(db.uniqueJobs.distinct("_id"))