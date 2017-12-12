let calls = require('./calls.json');

let first = calls[0];
let load = 0;
let busy = [];
let idxs = [];
let idx = 0;

calls.forEach((call, index) => {
    load++;
    idx = index;
    if (call.start > first.end) {
        busy.push(load);
        idxs.push(idx);
        load = 0;
        idx=0;
        first = call;
    }
});

console.log("|=============> busy", busy);
console.log("|=============> max", Math.max(...busy));

console.log("|=============> busy.lastIndexOf(78)", busy.lastIndexOf(78));
console.log("|=============> busy.indexOf(78)", busy.indexOf(78));
console.log("|=============> idxs[busy.indexOf(78)]", idxs[busy.indexOf(78)]);
console.log("|=============> calls[idxs[busy.indexOf(78)]]", calls[idxs[busy.indexOf(78)]]);


