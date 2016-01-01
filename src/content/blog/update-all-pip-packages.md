---
title:       "Update all pip packages"
description: "Shell function to update all pip packages."
date:        "2015-12-20"
layout:      "post.hbs"
collection:  "blog"
---

You can't update all pip packages with a single command. The only thing you can do is obtain a list of installed packages with `pip freeze` and update each package manually with `pip install -U`.

But you can script precisely that into a new `pip update` command that you can simulate by overriding the `pip` command with a shell function. Basically it lists the packages that are installed locally and pipes them to `pip install -U` for update.

```bash
pip() {
    if [[ $@ == "update" ]]; then
        command pip freeze --local | grep -v '^\-e' | cut -d = -f 1  | xargs -n1 pip install -U
    else
        command pip "$@"
    fi
}
```

Add the function to `.bashrc`, `.bash_profile`, `.zshrc` or whatever, reload your shell and now you can run `pip update` to update all packages in one go.
