import { Helmet } from 'react-helmet-async'
import { getMetaConfig, generateOGTags, generateTwitterTags } from '../../utils/metaConfig'

/**
 * SEO Component - Manages meta tags for each page
 * @param {string} page - The page identifier (e.g., 'home', 'schedule', 'awards')
 */
const SEO = ({ page = 'home' }) => {
  const config = getMetaConfig(page)
  const ogTags = generateOGTags(config)
  const twitterTags = generateTwitterTags(config)

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{config.title}</title>
      <meta name="title" content={config.title} />
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={config.url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogTags['og:type']} />
      <meta property="og:url" content={ogTags['og:url']} />
      <meta property="og:title" content={ogTags['og:title']} />
      <meta property="og:description" content={ogTags['og:description']} />
      <meta property="og:image" content={ogTags['og:image']} />
      <meta property="og:site_name" content={ogTags['og:site_name']} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterTags['twitter:card']} />
      <meta property="twitter:url" content={twitterTags['twitter:url']} />
      <meta property="twitter:title" content={twitterTags['twitter:title']} />
      <meta property="twitter:description" content={twitterTags['twitter:description']} />
      <meta property="twitter:image" content={twitterTags['twitter:image']} />
    </Helmet>
  )
}

export default SEO

