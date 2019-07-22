import React, { Component } from 'react'

class Properties extends Component {
  render () {
    const { entity, onChange } = this.props

    const pdfMeta = entity.pdfMeta || {}
    const changePdfMeta = (change) => onChange({ ...entity, pdfMeta: { ...entity.pdfMeta, ...change } })

    return (
      <div className='properties-section'>
        <div className='form-group'>
          <label>Title</label>
          <input type='text' value={pdfMeta.title} onChange={(v) => changePdfMeta({ title: v.target.value })} />
        </div>
        <div className='form-group'>
          <label>Author</label>
          <input type='text' value={pdfMeta.author} onChange={(v) => changePdfMeta({ author: v.target.value })} />
        </div>
        <div className='form-group'>
          <label>Subject</label>
          <input type='text' value={pdfMeta.subject} onChange={(v) => changePdfMeta({ subject: v.target.value })} />
        </div>
        <div className='form-group'>
          <label>Keywords</label>
          <input type='text' value={pdfMeta.keywords} onChange={(v) => changePdfMeta({ keywords: v.target.value })} />
        </div>
        <div className='form-group'>
          <label>Creator</label>
          <input type='text' value={pdfMeta.creator} onChange={(v) => changePdfMeta({ creator: v.target.value })} />
        </div>
        <div className='form-group'>
          <label>Producer</label>
          <input type='text' value={pdfMeta.producer} onChange={(v) => changePdfMeta({ producer: v.target.value })} />
        </div>
      </div>
    )
  }
}

export default Properties
