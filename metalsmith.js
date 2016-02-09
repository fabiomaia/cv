var metalsmith  = require('metalsmith');
var changed     = require('metalsmith-changed');
var date        = require('metalsmith-build-date');
var markdown    = require('metalsmith-markdown');
var prism       = require('metalsmith-prism');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var sitemap     = require('metalsmith-sitemap');

metalsmith(__dirname)
    .source('./src/content')
    .destination('./dest')
    .metadata({
        'site': {
            'url': 'https://fabiomaia.pt'
        },
        'title': 'Fábio Maia',
        'description': 'Wannabe Entrepreneur, Web Developer and Software Engineer',
        'name': 'Fábio Maia',
        'twitter': 'faviouz',
        'github': 'faviouz'
    })
    .clean(false)
    .use(changed({
        extnames: {
            '.md': '.html'
        }
    ))
    .use(markdown({
        gfm: true,
        tables: true,
        langPrefix: 'language-'
    }))
    .use(date({
        key: 'lastmod'
    }))
    .use(prism())
    .use(permalinks({
        'pattern': ':collection/:title',
    }))
    .use(collections({
        'blog': {
            'pattern': 'blog/*.md',
            'sortBy': 'date',
            'reverse': true
        }
    }))
    .use(layouts({
        engine: 'handlebars',
        directory: './src/layouts',
        partials: './src/layouts/partials'
    }))
    .use(sitemap({
        'hostname': 'https://fabiomaia.pt'
    }))
    .build(function(err) {
        if(err) throw err;
    });
