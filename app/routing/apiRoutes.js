// Dependencies
// =============================================================
const path = require("path");
const appDir = path.dirname(require.main.filename);
var friendList = require(path.join(appDir, "app/data/friends"))

module.exports = function(app) {

    // // Displays all friends
    // app.get("/api/friends", function(req, res) {
    //     return res.json(friends);
    // });

    // Displays a single friend, or returns false
    app.get("/api/friends/:friend", function(req, res) {
        var chosen = req.params.friend;

        for (var i = 0; i < friendList.length; i++) {
            if (chosen === friendList[i].userName) {
                return res.json(friendList[i]);

            }
        }
        return res.json(false);

    });

    // Create New Friend - takes in JSON input
    app.post("/api/friends/add", function(req, res) {

        var newFriend = req.body;
        // console.log(newFriend);
        // Using a RegEx Pattern to remove spaces from newfriend

        newFriend.userName = newFriend.name.replace(/\s+/g, "").toLowerCase();
        // // console.log(newFriend.scores)
        //convert our scores to numerics...
        newFriend.scores = newFriend.scores.map(function(x) {
            return parseInt(x, 10);
        });

        var bestFriends = [];
        var matchScore = 999;
        friendList.forEach(friend => {
            var newmatch = 0
            for (i = 0; i < friend.scores.length; i++) {
                newmatch += Math.abs(friend.scores[i] - newFriend.scores[i]);
            }
            console.log("matchscore: " + newmatch);
            // friend.scores.every(function(u, i) {
            //     newmatch += Math.abs(u - newFriend.scores[i]);
            //     // console.log("matchscore: " + newmatch);
            // })
            if (newmatch < matchScore) {
                bestFriends = [];
                bestFriends.push(friend);
                matchScore = newmatch;
            } else if (newmatch === matchScore) {
                bestFriends.push(friend);
            }
        });
        // console.log("matchscore: " + matchScore);

        console.log(bestFriends[0]);

        // console.log(newFriend.scores)
        friendList.push(newFriend);

        // This doesn't play nice with the jQuery...
        // return res.redirect("/");
        res.end(res.json(bestFriends[0].userName));

    });
}