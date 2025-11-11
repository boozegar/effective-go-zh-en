# Languages

<script>
    if (typeof window !== "undefined") {
        var preferred = (function () {
            try {
                return window.localStorage.getItem("honkit:language");
            } catch (err) {
                return null;
            }
        })();

        var lastChapter = (function () {
            try {
                return window.localStorage.getItem("honkit:lastChapter");
            } catch (err) {
                return null;
            }
        })();

        var target = preferred && preferred.trim() ? preferred.trim() : "zh";

        // If user has a last read chapter, redirect there; otherwise go to language home
        if (lastChapter && lastChapter.trim()) {
            window.location.replace("./" + target + "/" + lastChapter.trim());
        } else {
            window.location.replace("./" + target + "/");
        }
    }
</script>

* [简体中文](zh/)
* [English](en/)
