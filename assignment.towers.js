var tower1 = [1, 2, 3, 4, 5, 6, 7];
var tower2 = [];
var pom = [];

var difference = function (array2) {
    return array2[0] <= this[0];
};

var setOnTop = function (array2) {
    array2.splice(0, 0, this.shift());
};

var isEmpty = function () {
    return this.length < 1;
};

// for (var i = 0; i < tower1.length; i++) {
//     console.log("|=============> difference.call(tower1, tower2)", difference.call(tower1, tower2));
//     if (isEmpty.call(tower2)) {
//         setOnTop.call(tower1, tower2);
//     } else if (isEmpty.call(pom)) {
//         setOnTop.call(tower1, tower2);
//     }
// }

var p = function () {}

// console.log("|=============> tower1", tower1);
// console.log("|=============> tower2", tower2);
// console.log("|=============> pom", pom);

p(5);
