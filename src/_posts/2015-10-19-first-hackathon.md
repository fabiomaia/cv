---
layout:      "post"
title:       "First Hackathon"
description: "Thoughts and experiences at my first hackathon."
---

A month ago I participated in a one-week hackathon, [Porto Summer of Code](http://www.portosummerofcode.com/), with two friends. We decided to build an app that algorithmically generated a tourism route from a given city and a set of interests. You input it your interests as a tourist and from your geographical location it suggests routes with potential points of interest. We called it *On My Way*. It looks something like this:

![On My Way Screenshot]({{ site.url }}/assets/images/onmyway_screenshot.jpg)

## Server


To build the internal API we used Python to iterate quickly and painlessly through the codebase. But we naively decided to use [Falcon](http://falconframework.org/), a performant and well architectured Python framework beautifully designed around web APIs and REST architectures. In retrospect, that was overly ambitious and we over-engineered it seeing how we only needed to work with a single endpoint. We should have just used Flask, it's way more popular and well documented.

Initially we planned on querying a bunch of APIs like Foursquare, Yelp and Instagram and crunching all the data together. But in the spirit of building a simple proof of concept, we used just the Foursquare API and parsed out the data we needed.

The [Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/intro) allowed us to compute real traveling distances between points rather than the obvious, boring, euclidean distances that can be implemented using simple math in a single line of code. This was essential for the central algorithm to produce good results.

<a class="github-button" href="https://github.com/portosummerofcode/onmyway-server" data-icon="octicon-star" data-style="mega" data-count-href="/portosummerofcode/onmyway-server/stargazers" data-count-api="/repos/portosummerofcode/onmyway-server#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star portosummerofcode/onmyway-server on GitHub">Star</a>

## Client


As we were not too comfortable in Android yet, we thought it was best to write the client in HTML, CSS and JavaScript.

We used [MDL](http://www.getmdl.io/) for the UI to get that Material Design feel but I personally found the framework to be lacking in UI components, for which we had to hack together some components ourselves.

[gmaps.js](https://hpneo.github.io/gmaps/) was essential in abstracting away all the nitty details of the Google Maps JavaScript API, letting us just draw stuff on a map.

The client was deployed natively across mobile platforms using [PhoneGap](http://phonegap.com/). None of us had ever used PhoneGap, which was another risky move, but it was probably the best decision we made seeing how ridiculously easy it was to get up and running. [Adobe PhoneGap Build](https://build.phonegap.com/) compiled the build for us in the cloud and generated a production ready APK that you could install immediately.

<a class="github-button" href="https://github.com/portosummerofcode/onmyway-client" data-icon="octicon-star" data-style="mega" data-count-href="/portosummerofcode/onmyway-client/stargazers" data-count-api="/repos/portosummerofcode/onmyway-client#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star portosummerofcode/onmyway-client on GitHub">Star</a>

## Experience

The organization of Porto Summer of Code did a great job in making the environment really fun and laid-back, all while remaining very challenging and demanding.

After working remotely for 4 days, we took a train to Oporto. The organization offered to pay for our stay for the next 3 days, which we weren't expecting at all. Breakfast and lunch was on them, too, and we had infinite coffee and snacks. Not to mention the awesome gift bags. It was just full of nice little surprises.

It's amazing how the people behind all this managed to pull it off. We are very thankful for the experience. It was a lot of fun and I hope to be there again next year!

<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
