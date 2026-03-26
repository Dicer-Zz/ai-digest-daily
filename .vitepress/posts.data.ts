import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  // Include frontmatter in data
  includeSrc: false,
  transform(rawData) {
    return rawData.map(page => ({
      url: page.url,
      frontmatter: page.frontmatter,
    }))
  }
})

// Type declaration
export declare const data: {
  url: string
  frontmatter: {
    title?: string
    date: string
    tags?: string[]
    summary?: string
  }
}[]
