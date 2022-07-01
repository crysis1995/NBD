var map = function(){
    var entity = this;
    var key = entity.sex;
    var value = {
        count:1,
        weight:  parseFloat(entity.weight) || 0,
        height: parseFloat(entity.height) || 0
    }

    emit(key,value)
}

var reduce = function(key, values){
    var result = {
        count:0,
        weight:0,
        height:0
    }
    for(var i=0; i <values.length;  i++){
        result.count+=values[i].count
        result.weight+=values[i].weight;
        result.height+=values[i].height;
    }
    return result;
}

var finalize = function(key, value){
    return {
        avgWeight:value.weight / value.count,
        avgHeight:value.height / value.count
    }
}
db.people.mapReduce(map,reduce,{out:"all",finalize});

printjson(db.all.find({}).toArray())