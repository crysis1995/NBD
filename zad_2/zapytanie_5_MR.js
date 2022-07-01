var map = function(){
    this.credit.forEach(e => {
        var value = parseFloat(e.balance) || 0
        emit(e.currency, {sum:value,count:1})
    })
}
var reduce = function(key,values){
    return values.reduce((prev,acc)=>{
        prev.sum+=acc.sum
        prev.count+=acc.count
        return prev;
    },{sum:0,count:0})
}

var finalize = function(key, values){
    return {
        sum:values.sum,
        avg:values.sum / values.count,
        count:values.count
    }

}

printjson(db.people.mapReduce(map, reduce, {out:"polishFemale",query:{nationality:"Poland",sex:"Female"},finalize}).find().toArray());