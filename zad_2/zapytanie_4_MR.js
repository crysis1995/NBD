var map = function(){
    var key = this.nationality;
    var bmi = (parseFloat(this.weight ) || 0) / Math.pow((parseFloat(this.height) || 0)/100,2)
    var value = {avg:bmi,min:bmi,max:bmi,count:1};
    emit(key,value);
};
var reduce = function(key,values){
    var result = {
        avg:0,
        min:values[0].min,
        max:values[0].max,
        count:0
    }

    for(var i=0; i <values.length; i++){
        result.min = values[i].min < result.min  ? values[i].min :result.min
        result.max =  values[i].max > result.max ? values[i].max : result.max
        result.avg += values[i].avg
        result.count += values[i].count
    }
    return result
};
var finalize = function(key, values){
    return {
        avg:values.avg / values.count,
        min:values.min,
        max:values.max
    }
}

printjson(db.people.mapReduce(map,reduce,{out:"BMI",finalize}).find().toArray())