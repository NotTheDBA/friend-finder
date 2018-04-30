// Dependencies
// =============================================================
const path = require("path");
const appDir = path.dirname(require.main.filename);
var friends = require(path.join(appDir, "app/data/friends"))

module.exports = function(app) {

    // Displays all friends
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

    // Displays a single friend, or returns false
    app.get("/api/friends/:friend", function(req, res) {
        var chosen = req.params.friend;

        console.log(chosen);

        for (var i = 0; i < friends.length; i++) {
            if (chosen === friends[i].userName) {
                return res.json(friends[i]);
            }
        }
        return res.json(false);
    });

    // Create New Friend - takes in JSON input
    app.post("/api/friends", function(req, res) {

        var newFriend = req.body;
        // Using a RegEx Pattern to remove spaces from newfriend
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newFriend.userName = newFriend.name.replace(/\s+/g, "").toLowerCase();

        console.log(newFriend);

        friends.push(newFriend);

        res.json(friends);
    });
}






// // Create New friends - takes in JSON input
// app.post("/api/friends", function(req, res) {
//     // req.body hosts is equal to the JSON post sent from the user
//     // This works because of our body-parser middleware
//     var newfriend = req.body;



//     console.log(newfriend);

//     friends.push(newfriend);

//     res.json(newfriend);
// });