var t = ['t1', 't2', 't3', 't4', 't5'];
var tt = ['t1', 't2', 't3', 't4', 't5', 't6'];
var ttt = ['t1', 't2', 't3', 't4', 't5', 't6', 't7'];

var all_pairs = function (a) {
    var game = '';
    var all = [];
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a.length; j++) {
            if (i !== j) {
                game = a[i] + ':' + a[j];
                all.push(game);
            }
        }
    }

    return all;
};

var filter = function (permutations, rounds, round_number, mod, last_round) {
    return permutations.reduce(function (rounds, one_permutation) {
        if (!(one_permutation in rounds)) {
            var found = Object.keys(rounds).filter(function (game) {
                return game.split(':').filter(function (team) {
                    return one_permutation.split(':').indexOf(team) !== -1;
                }).length;
            }).length;

            var away = Object.keys(last_round).filter(function (game) {
                return one_permutation.split(':')[0] === game.split(':')[0] && mod;
            }).length > 0;

            if (!found && !away) {
                rounds[one_permutation] = round_number;
            }
        }
        return rounds;
    }, rounds);
};

var games = function (teams) {
    var permutations = all_pairs(teams);
    var rounds = [];

    var i = 0;
    while (permutations.length > 0) {
        rounds.push(filter(permutations, {}, i + 1, /*i % 2 === 1*/ false, rounds[i - 1] || {}));
        permutations = permutations.filter(function (game) {
            return rounds.map(function (round) {
                return game in round;
            }).indexOf(true) === -1;
        });
        i++;
    }

    return rounds;
};

console.log('games(5)', games(t));
console.log('games(6)', games(tt));
console.log('games(7)', games(ttt));
