const path = require("path");
var appDir = path.dirname(require.main.filename);

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(appDir, "app/public/home.html"))
    })

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(appDir, "app/public/survey.html"))
    })

    app.get("/view/", function(req, res) {
        // console.log(req.params.friend);
        res.sendFile(path.join(appDir, "app/public/view.html"))
    })
}