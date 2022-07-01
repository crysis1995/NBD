var map = function(){
    this.credit.forEach(e => {
        var key = e.currency;
        var value = parseFloat(e.balance ? e.balance : 0);
        emit(key, value);
    })
}
var reduce = function(key, value) {
    return Array.sum(value);
}
printjson(db.people.mapReduce(map,reduce,{out:"balance",sort:{_id:-1}).find().toArray())