const path = require('path')
module.exports = function (reporter, definition) {
  reporter.documentStore.registerComplexType('PdfMetaType', {
    title: { type: 'Edm.String' },
    author: { type: 'Edm.String' },   
    subject: { type: 'Edm.String' },  
    keywords: { type: 'Edm.String' },   
    creator: { type: 'Edm.String' },    
    producer: { type: 'Edm.String' }  
  })

  reporter.documentStore.model.entityTypes['TemplateType'].pdfMeta = { type: 'jsreport.PdfMetaType' }

  if (reporter.compilation) {
    reporter.compilation.include('scriptPdfMeta', path.join(__dirname, 'scriptPdfMeta.js'))    
  }

  reporter.initializeListeners.add('pdf-meta', () => {
    reporter.afterRenderListeners.insert({ after: 'pdf-utils', before: 'scripts' }, 'pdfMeta', async (req, res) => {
      if (!req.template.pdfMeta || res.meta.contentType !== 'application/pdf') {
        return
      }    

      const result = await reporter.executeScript({
        pdfContent: res.content.toString('base64'),
        pdfMeta: req.template.pdfMeta        
      }, {
        execModulePath: reporter.execution ? reporter.execution.resolve('scriptPdfMeta') : path.join(__dirname, 'scriptPdfMeta.js'),        
      }, req)

      if (result.error) {
        const error = new Error(result.error.message)
        error.stack = result.error.stack
  
        throw reporter.createError('Error while adding pdf meta', {
          original: error,
          weak: true
        })
      }
  
      res.content = Buffer.from(result.pdfContent, 'base64')
    })
  })
}  
     