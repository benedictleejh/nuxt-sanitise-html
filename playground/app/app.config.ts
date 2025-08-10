/**
 * Appends 'noopener' & 'noreferrer' to rel
 * attr values to prevent reverse tabnabbing.
 */
const appendSecureRelValue = (rel: string) => {
  const attributes = new Set(rel ? rel.toLowerCase().split(' ') : [])

  attributes.add('noopener')
  attributes.add('noreferrer')

  return Array.from(attributes).join(' ')
}
const TEMPORARY_ATTRIBUTE = 'data-temp-href-target'

export default defineAppConfig({
  sanitiseHtml: {
    profiles: {
      safeTargetBlank: {
        hooks: {
          beforeSanitizeAttributes: (node) => {
            if (node.tagName === 'A' && node.hasAttribute('target')) {
              node.setAttribute(TEMPORARY_ATTRIBUTE, node.getAttribute('target'))
            }
          },
          afterSanitizeAttributes: (node) => {
            if (node.tagName === 'A' && node.hasAttribute(TEMPORARY_ATTRIBUTE)) {
              node.setAttribute('target', node.getAttribute(TEMPORARY_ATTRIBUTE))
              node.removeAttribute(TEMPORARY_ATTRIBUTE)
              if (node.getAttribute('target') === '_blank') {
                const rel = node.getAttribute('rel')
                node.setAttribute('rel', appendSecureRelValue(rel))
              }
            }
          }
        }
      }
    }
  }
})
