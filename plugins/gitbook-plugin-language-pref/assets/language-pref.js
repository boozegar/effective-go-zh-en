(function (gitbook) {
  var languages = {
    "zh": "简体中文",
    "en": "English"
  };

  function getChapterFromPath(path) {
    // Extract chapter filename from path (e.g., "/zh/05_Semicolons.html" -> "05_Semicolons.html")
    // Only match chapter files (01-16), not index.html
    var match = path.match(/\/(\d{2}_[^\/]+\.html)/);
    return match ? match[1] : null;
  }

  function persistLanguage() {
    if (!gitbook || !gitbook.state || !gitbook.state.book) {
      return;
    }
    var lang = gitbook.state.book.language;
    if (!lang) {
      return;
    }
    try {
      window.localStorage.setItem("honkit:language", lang);
    } catch (err) {
      /* ignore persistence errors */
    }
  }

  function persistLastChapter() {
    var currentPath = window.location.pathname;
    var chapter = getChapterFromPath(currentPath);

    // Only persist if we're on a chapter page (not index/preface)
    if (chapter) {
      try {
        window.localStorage.setItem("honkit:lastChapter", chapter);
      } catch (err) {
        /* ignore persistence errors */
      }
    }
  }

  function createLanguageSwitcher() {
    if (!gitbook || !gitbook.state || !gitbook.state.book) {
      return;
    }

    var currentLang = gitbook.state.book.language;
    if (!currentLang) {
      return;
    }

    // Remove existing switcher if any
    var existing = document.querySelector(".language-switcher");
    if (existing) {
      existing.remove();
    }

    // Create language switcher
    var switcher = document.createElement("div");
    switcher.className = "language-switcher";

    var select = document.createElement("select");
    select.className = "language-selector";

    Object.keys(languages).forEach(function(lang) {
      var option = document.createElement("option");
      option.value = lang;
      option.textContent = languages[lang];
      option.selected = lang === currentLang;
      select.appendChild(option);
    });

    select.addEventListener("change", function() {
      var targetLang = select.value;
      var currentPath = window.location.pathname;
      var pathParts = currentPath.split("/");

      // Replace language in path
      var newPath = currentPath.replace("/" + currentLang + "/", "/" + targetLang + "/");

      try {
        window.localStorage.setItem("honkit:language", targetLang);
      } catch (err) {
        /* ignore */
      }

      window.location.href = newPath;
    });

    switcher.appendChild(select);

    // Insert into book header
    var header = document.querySelector(".book-header");
    if (header) {
      header.appendChild(switcher);
    }
  }

  gitbook.events.bind("page.change", function() {
    persistLanguage();
    persistLastChapter();
    createLanguageSwitcher();
  });
})(window.gitbook);
