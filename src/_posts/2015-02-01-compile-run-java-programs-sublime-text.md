---
layout:      "page"
title:       "Compile and Run Java Programs in Sublime Text"
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, esse ipsa adipisci officiis itaque maiores consequatur error culpa ducimus dolor quas vitae, iure suscipit expedita libero quae illum quaerat? Autem."
classname:   "blog"
---

The default Java build tool in Sublime Text lets you compile a Java file with cmd+b. But you have to run the program separately in a terminal. Wouldn't it b

{% highlight json %}
{
    "cmd": ["javac \"$file_name\" && java \"$file_base_name\""],
    "file_regex": "^(...*?):([0-9]*):?([0-9]*)",
    "selector": "source.java",
    "shell": true
}
{% endhighlight %}

However, Sublime Text's console will error out if your program requires any user input. This is a limitation in Sublime Text. If this isn't a problem for you you're good to go. Otherwise you will need to adopt a different workflow.

I have found that the best way to get around this is to let
