---
layout:      "post"
title:       "Notes about this website"
description: "A few notes about the engineering behind this very simple website."
---

Rather than posting the extremely bland _Hello World_ first entry on my blog, I figured I should write something a little more useful. These are some notes about the engineering behind this very simple static website.

## Development Environment

Installing development dependencies on your host machine is always a clusterfuck. Vagrant solves this problem.

Thanks to [Vaprobash](https://github.com/fideloper/Vaprobash) I quickly whipped together a `Vagrantfile` that defined an Ubuntu virtual machine with everything I needed: the [github-pages gem](https://github.com/github/pages-gem), [npm](https://www.npmjs.com/), [bower](http://bower.io/) and [gulp](http://gulpjs.com/).

To setup the virtual machine and SSH in I run:

{% highlight bash %}
$ vagrant up
$ vagrant ssh
{% endhighlight %}

## Markup

I love perfect, semantic markup. I spend _way_ too much time obsessing over it. I don't care if the markup is harder to style for. I also completely disregard any kind of browser compatibility concerns. Semantics is more important.

## Styles

I really wanted to over-engineer the styles (even though I only have one or two static pages and a blog), so I went crazy and went all in with [Sass](http://sass-lang.com/), leveraged [inuitcss](https://github.com/inuitcss) components and employed the BEM methodology for modularity and reusability.

## Scripts

There isn't really much to say about JavaScript. I just needed to query an element in the DOM and manipulate it a bit. Mostly because I wanted to be fancy and load random backgrounds on each page load.

## Build

Every byte counts on shitty hotel Wi-Fi. With that in mind I made it a goal to:

* Compile the Jekyll site.
* Minify the HTML into a single line.
* Optimize and compress images as much as possible.
* Compile Sass, remove unused CSS, prefix and minify it.
* Lint, concatenate and uglify the JavaScript.

[gulp](http://gulpjs.com/) is managing the whole build process. To build once and automatically watch for changes to your assets I run:

{% highlight bash %}
$ gulp
{% endhighlight %}

## Deploy

For simple static websites you can't really beat GitHub Pages. Free, 100% uptime, push-to-deploy hosting? Yes, please.

When I'm ready to deploy a new blog post or push my latest changes, all I need to do is run:

{% highlight bash %}
$ gulp deploy
{% endhighlight %}

## CloudFlare

If you try to have a website on GitHub Pages that sits on a root domain (a domain that isn’t a subdomain), like I wanted to, [it will sometimes load really slowly](http://instantclick.io/github-pages-and-apex-domains). To fix this I moved to CloudFlare's DNS.

As an added bonus, I get control over caching, free SSL and a bunch of other things.

## License

Not that it matters, but I licensed everything under the [WTFPL](http://www.wtfpl.net/) because I genuinely don't fucking care. Doesn't get any more open source than that.
