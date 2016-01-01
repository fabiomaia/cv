var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var prism       = require('metalsmith-prism');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');

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
    .use(markdown({
        gfm: true,
        tables: true,
        langPrefix: 'language-'
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
    .build(function(err) {
        if(err) throw err;
    });
