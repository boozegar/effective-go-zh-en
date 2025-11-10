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
        var target = preferred && preferred.trim() ? preferred.trim() : "zh";
        window.location.replace("./" + target + "/");
    }
</script>

* [简体中文](zh/)
* [English](en/)
