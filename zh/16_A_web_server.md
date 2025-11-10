---
title: "一个 Web 服务器"
weight: 16
---

## 一个 Web 服务器

让我们以一个完整的 Go 程序作为结束吧，一个 Web 服务器。该程序其实只是一个 Web 服务的重用。Google 在 <http://chart.apis.google.com> 提供了一个将数据自动格式化为图表的服务。不过要交互式地使用它并不容易，因为你需要把数据作为查询参数放进 URL 中。这里的程序为某种数据提供了一个更友好的接口：给定一小段文本，它会调用图表服务器生成一个 QR 码，这是一种编码文本的点阵矩阵。用手机摄像头扫描图片后就能把它解析成一个字符串，比如一个 URL，从而省去了在狭小的手机键盘上输入的麻烦。

以下为完整的程序，随后还有一段说明。

```go
package main

import (
    "flag"
    "html/template"
    "log"
    "net/http"
)

var addr = flag.String("addr", ":1718", "http service address") // Q=17, R=18

var templ = template.Must(template.New("qr").Parse(templateStr))

func main() {
    flag.Parse()
    http.Handle("/", http.HandlerFunc(QR))
    err := http.ListenAndServe(*addr, nil)
    if err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}

func QR(w http.ResponseWriter, req *http.Request) {
    templ.Execute(w, req.FormValue("s"))
}

const templateStr = `
<html>
<head>
<title>QR Link Generator</title>
</head>
<body>
{{if .}}
<img src="http://chart.apis.google.com/chart?chs=300x300&cht=qr&choe=UTF-8&chl={{.}}" />
<br>
{{.}}
<br>
<br>
{{end}}
<form action="/" name=f method="GET"><input maxLength=1024 size=70
name=s value="" title="Text to QR Encode"><input type=submit
value="Show QR" name=qr>
</form>
</body>
</html>
`
```

`main` 之前的代码应该比较容易理解。我们用一个标志为服务器设置了默认的 HTTP 端口。模板变量 `templ` 正是有趣的地方。它构建出了一个 HTML 模板，服务器会执行模板来渲染页面；稍后我们会更详细地讨论这一点。

`main` 函数解析命令行标志，并用我们前面提到的机制把 `QR` 函数绑定到服务器的根路径。随后调用 `http.ListenAndServe` 启动服务器；服务器运行期间这个调用会一直阻塞。

`QR` 只是接收包含表单数据的请求，然后为表单中名为 `s` 的字段执行模板。

模板包 `html/template` 功能强大；这个程序只是浅尝辄止。本质上，它在运行时通过把传给 `templ.Execute` 的数据项（在这里是表单值）代入模板，把一段 HTML 文本即时重写。在模板文本（`templateStr`）中，用双大括号括起来的片段表示模板动作。从 `{{if .}}` 到 `{{end}}` 的那段代码只有在当前数据项（也就是 `.`，读作 dot）非空时才会执行。换句话说，当字符串为空时，这部分模板会被省略。

两处 `{{.}}` 表示要把传给模板的数据（也就是查询字符串）显示在网页上。HTML 模板包会自动进行适当的转义，因此文本显示是安全的。

模板字符串的其它部分就是页面加载时要展示的那段 HTML。如果这些解释还是太快，请查看模板包的[文档](https://go-zh.org/pkg/html/template/)来获取更详细的介绍。

你终于如愿以偿了：只用了几行代码加上一些数据驱动的 HTML 文本，就写出了一个实用的 Web 服务器。Go 足够强大，少量代码就能完成很多事情。
