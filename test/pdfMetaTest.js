require('should')
const jsreport = require('jsreport-core')

describe('pdf-meta', () => {
  let reporter

  beforeEach(() => {
    reporter = jsreport({
      templatingEngines: {
        strategy: 'in-process'
      }
    }).use(require('../')())
      .use(require('jsreport-templates')())
      .use(require('jsreport-chrome-pdf')())
    return reporter.init()
  })

  afterEach(() => reporter.close())

  it('should produce pdf with sign', async () => {
    const result = await reporter.render({
      template: {
        content: 'Hello',
        engine: 'none',
        recipe: 'chrome-pdf',
        pdfMeta: {
          title: 'Foo-title',
          author: 'Foo-author',
          subject: 'Foo-subject',
          keywords: 'Foo-keywords',
          creator: 'Foo-creator',
          producer: 'Foo-producer'
        }
      }
    })

    require('fs').writeFileSync('out.pdf', result.content)
    result.content.toString().should.containEql('Foo-title')
      .and.containEql('Foo-author')
      .and.containEql('Foo-subject')
      .and.containEql('Foo-keywords')
      .and.containEql('Foo-creator')
      .and.containEql('Foo-producer')
  })
})
