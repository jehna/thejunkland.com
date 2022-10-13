import sass from 'sass'

export const compileStyles = () => {
  const inlineStyles = sass.compile('styles/inline.scss', {
    style: 'compressed'
  })
  const delayedStyles = sass.compile('styles/delayed.scss', {
    style: 'compressed'
  })
  return {
    inline: inlineStyles.css,
    delayed: delayedStyles.css
  }
}
