---
title: 'Golang: Hello World'
description: 'Hello world in Golang'
coverImage: '/assets/blog/golang-hello-world/cover.jpg'
dateFormatted: '2024-07-06T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/golang-hello-world/cover.jpg'
wordCount: 610
layout: ../../layouts/post.astro
status: published
---
Hi everyone,

Today I’m gonna share about simple tutorial how to create hello world in golang.

> Go is a statically typed, compiled high-level programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. It is syntactically similar to C, but also has memory safety, garbage collection, structural typing, and CSP-style concurrency. [Wikipedia](https://en.wikipedia.org/wiki/Go_(programming_language))

So, if you want to read more information about golang, you can find out in this website [https://go.dev/](https://go.dev/)

Back to the tutorial, I assumed that you already installed golang into your operating system or you might not want to install it, then you can use the playground of golang.

[https://go.dev/play/](https://go.dev/play/)

First of all, you need to create directory for project golang. Here, I add golang for the name of directory or folder.

```rust
mkdir golang
```

After that, you should created module for project of golang. This means for tracking the dependencies that you are installed.

```rust
go mod init hello-world
```

Once you run that command, it will automatically generate new file which name is **go.mod**

```rust
module hello-world

go 1.22.5

```

Next, create a new file for your main code of your project. I will create main.go

```rust
package main

import "fmt"

func main() {
	fmt.Println("Hello World")
}

```

Each project on golang only have one package main. So, I will set the main.go as a package main project. Then, I used library fmt from golang to print out some data on the console.

Then, I create function main to print out Hello World.

So, the result like the image below.

<img src="/assets/blog/golang-hello-world/result.png" alt="Result" class="img img-responsive mb-3" style="border-radius: 5px;" >

Let’s add some library and you will know how to install the library on the golang project.

You can find some package on [pkg.go.dev](http://pkg.go.dev) . Here, I will install quote package.

I’ll update my main.go like this.

```rust
package main

import "fmt"

import "rsc.io/quote"

func main() {
    fmt.Println(quote.Go())
}

```

I used [rsc.io/quote](http://rsc.io/quote) for generate quote and then call the function inside of the Println.

Then, try to run the program.

<img src="/assets/blog/golang-hello-world/no-package-installed.png" alt="No Package Installed" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Unfortunately, we got some error that the modules not yet installed. So we can use the suggestion command to install the package or use this command

- `go get rsc.io/quote`
- `go mod tidy`

After you run the command one of them, it will automatically created a new file go.sum and also update the go.mod, like this.

go.mod

```rust
module hello-world

go 1.22.5

require (
	golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c // indirect
	rsc.io/quote v1.5.2 // indirect
	rsc.io/sampler v1.3.0 // indirect
)

```

go.sum

```rust
golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c h1:qgOY6WgZOaTkIIMiVjBQcw93ERBE4m30iBm00nkL0i8=
golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c/go.mod h1:NqM8EUOU14njkJ3fqMW+pc6Ldnwhi/IjpwHt7yyuwOQ=
rsc.io/quote v1.5.2 h1:w5fcysjrx7yqtD/aO+QwRjYZOKnaM9Uh2b40tElTs3Y=
rsc.io/quote v1.5.2/go.mod h1:LzX7hefJvL54yjefDEDHNONDjII0t9xZLPXsUe+TKr0=
rsc.io/sampler v1.3.0 h1:7uVkIFmeBqHfdjD+gZwtXXI+RODJ2Wc4O7MPEh/QiW4=
rsc.io/sampler v1.3.0/go.mod h1:T1hPZKmBbMNahiBKFy5HrXp6adAjACjK9JXDnKaTXpA=

```

After that, just run the program again on the you’ll the result like this.

<img src="/assets/blog/golang-hello-world/random-quote.png" alt="Random Quote" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Okeee, that’s all the introduction for hello world on the golang.

### References

<p><div class="link-preview-widget"><a href="https://go.dev/doc/tutorial/getting-started" class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">Tutorial: Get started with Go - The Go Programming Language</div><div class="link-preview-widget-description">Tutorial: Get started with Go - The Go Programming Language</div><div class="link-preview-widget-url">https://go.dev/</div></a><a class="link-preview-widget-image" href="https://go.dev/doc/tutorial/getting-started" rel="noopener" style="background-image: url('https://go.dev/doc/gopher/gopher5logo.jpg');" target="_blank"></a></div></p>

#Tutorial #Golang #HelloWorld
