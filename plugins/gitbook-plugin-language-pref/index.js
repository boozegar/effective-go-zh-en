module.exports = {
  book: {
    assets: "./assets",
    js: ["language-pref.js"],
    css: ["language-pref.css"],
  },
  hooks: {
    "finish": function() {
      var fs = require("fs");
      var path = require("path");

      var indexPath = path.join(this.options.output, "index.html");

      try {
        var content = fs.readFileSync(indexPath, "utf8");

        // Find the script that does the redirect and modify it
        var modifiedContent = content.replace(
          /var target = resolvePreference\(\);/,
          `var target = resolvePreference();

    // Check for last read chapter
    var lastChapter = null;
    try {
        lastChapter = window.localStorage.getItem("honkit:lastChapter");
    } catch (err) {
        /* ignore */
    }

    // If we have a last chapter, redirect to it
    if (lastChapter && lastChapter.trim()) {
        try {
            window.localStorage.setItem("honkit:language", target);
        } catch (err) {
            /* ignore */
        }
        window.location.replace(target + "/" + lastChapter.trim());
        return;
    }`
        );

        fs.writeFileSync(indexPath, modifiedContent, "utf8");
      } catch (err) {
        // Silently ignore if index.html doesn't exist or can't be modified
      }
    }
  }
};
