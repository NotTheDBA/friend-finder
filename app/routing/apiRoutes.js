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
        
        // Using a RegEx Pattern to remove spaces from the name for our username
        newFriend.userName = newFriend.name.replace(/\s+/g, "").toLowerCase();
        
        // Convert our scores to numerics...
        newFriend.scores = newFriend.scores.map(function(x) {
            return parseInt(x, 10);
        });

        // Run a match compare
        var bestFriends = [];
        var matchScore = 999;
        friendList.forEach(friend => {
            var newmatch = 0
            for (i = 0; i < friend.scores.length; i++) {
                newmatch += Math.abs(friend.scores[i] - newFriend.scores[i]);
            }
            friend.MatchScore = 100-newmatch;

            if (newmatch < matchScore) {
                bestFriends = [];
                bestFriends.push(friend);
                matchScore = newmatch;
            } else if (newmatch === matchScore) {
                bestFriends.push(friend);
            }
        });
        
        friendList.push(newFriend);

        // This didn't play nice with the jQuery...
        // return res.redirect("/");
        res.end(res.json(bestFriends[0].userName));

    });
}