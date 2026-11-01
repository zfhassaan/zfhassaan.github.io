import { useI18n } from 'vue-i18n'

export function useCopy() {
  const { t, te, locale } = useI18n()

  function projectField(project, field) {
    const key = `projects.items.${project.id}.${field}`
    return te(key) ? t(key) : project[field]
  }

  function projectList(project, field) {
    return (project[field] || []).map((item, index) => {
      const key = `projects.items.${project.id}.${field}.${index}`
      return te(key) ? t(key) : item
    })
  }

  function linkLabel(project, link, index) {
    const key = `projects.items.${project.id}.linkLabels.${index}`
    return te(key) ? t(key) : link.label
  }

  function visualLine(project, line, index) {
    const key = `projects.items.${project.id}.visualLines.${index}`
    return line != null && te(key) ? t(key) : line
  }

  function schemaText(project, rowIndex, boxIndex, text) {
    const key = `projects.items.${project.id}.schema.${rowIndex}.${boxIndex}`
    return te(key) ? t(key) : text
  }

  function toolField(tool, field) {
    const key = `tools.items.${tool.slug}.${field}`
    return te(key) ? t(key) : tool[field]
  }

  return { t, te, locale, projectField, projectList, linkLabel, visualLine, schemaText, toolField }
}
