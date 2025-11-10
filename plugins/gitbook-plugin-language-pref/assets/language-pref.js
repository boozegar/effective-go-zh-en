(function (gitbook) {
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

  gitbook.events.bind("page.change", persistLanguage);
})(window.gitbook);
