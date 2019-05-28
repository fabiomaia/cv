# cv

My online résumé which you are free to fork and use as a template.

## Features

- Simple, minimal, [motherfuckingwebsite.com](https://motherfuckingwebsite.com/)-esque design
- Mobile-first and responsive
- Print-friendly and made to be exported to a one-page PDF with <kbd>ctrl</kbd>+<kbd>p</kbd> on any modern web browser
- Dark-friendly through extensions like Dark Reader
- Highly semantic, accessible, specification compliant HTML5
- Relies on available system fonts by setting `font-family: sans-serif` because incurring an external HTTP request of 1-3KB responses of Google Fonts CSS that will trigger additional external HTTP requests with 10-20KB responses for each selected font format provides questionable impact on readability of a one page résumé
- Zero JavaScript because why would you need JavaScript for what is obviously a static one page document?
- Inlined CSS because why would you incur an additional HTTP request to load ~1000 bytes of CSS?
- Class-less HTML because why would you need classes for a single static document on which you can directly target the predictably unique elements themselves?
- TravisCI CI/CD pipeline that
  - validates `index.html` against the [W3C's validator](https://github.com/validator/validator)
  - checks `index.html` for broken links
  - deploys a minified `index.html`
