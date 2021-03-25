export default function Noscript({ children }) {
  if (typeof window === 'undefined') {
    return null
  }
  let ReactDOMServer = require('react-dom/server')
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(children)
  return (
    <noscript
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{ __html: staticMarkup }}
    />
  )
}
