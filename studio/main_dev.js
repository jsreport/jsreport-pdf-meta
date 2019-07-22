import TemplateProperties from './TemplateProperties'
import Studio from 'jsreport-studio'

Studio.addPropertiesComponent('pdf meta', TemplateProperties, (entity) => entity.__entitySet === 'templates' && entity.recipe.includes('pdf'))

Studio.addApiSpec({
  template: {
    pdfMeta: {
      title: '...',
      author: '...',
      subject: '...',
      keywords: '...',
      creator: '...',
      producer: '...'
    }
  }
})
