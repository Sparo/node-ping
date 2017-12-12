(function () {
    window.clanovi = document.getElementsByClassName('forums')[0].children[1].children;
    var nizClanova = [];
    try {
        for (var i = 0; i < clanovi.length; i++) {
            var clan = {};
            clan.ime = typeof clanovi[i].children[0].children[0].children[0] !== 'undefined' ? clanovi[i].children[0].children[0].children[0].innerHTML : '0';
            clan.posts = typeof clanovi[i].children[1].children[0] !== 'undefined' ? clanovi[i].children[1].children[0].innerHTML : '0';
            clan.topics = typeof clanovi[i].children[1].children[2] !== 'undefined' ? clanovi[i].children[1].children[2].innerHTML : '0';
            clan.clanarina = false;

            if (clan.ime === 'phpsrbija.rs') {
                continue;
            }
            if (clan.posts === '') {
                clan.posts = '0';
            }

            nizClanova.push(clan);
        }
    } catch (e) {
        console.log('Error in calculating clanarina: ', e);
    }

    // create textarea for listing
    var x = document.createElement("textarea");
    x.style.position = 'fixed';
    x.style.top = 0;
    x.style.left = 0;
    x.style.width = '1000px';
    x.style.height = '500px';
    x.value = JSON.stringify(nizClanova);
    document.body.appendChild(x);
})();
