const pdfjs = require('jsreport-pdfjs')

module.exports = async (inputs, callback, done) => {
  try {
    const extContent = new pdfjs.ExternalDocument(Buffer.from(inputs.pdfContent, 'base64'))
    const doc = new pdfjs.Document()

    doc.info.Title = inputs.pdfMeta.title
    doc.info.Author = inputs.pdfMeta.author
    doc.info.Subject = inputs.pdfMeta.subject
    doc.info.Keywords = inputs.pdfMeta.keywords
    doc.info.Creator = inputs.pdfMeta.creator
    doc.info.Producer = inputs.pdfMeta.producer

    doc.addPagesOf(extContent)
    const resultPdfBuffer = await doc.asBuffer()

    done(null, {
      pdfContent: resultPdfBuffer.toString('base64')
    })
  } catch (e) {
    done(null, {
      error: {
        message: e.message,
        stack: e.stack
      }
    })
  }
}
