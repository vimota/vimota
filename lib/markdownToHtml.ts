import unified from 'unified';
import markdown from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import raw from 'rehype-raw';
import sanitize from 'rehype-sanitize';
import prism from '@mapbox/rehype-prism';
import html from 'rehype-stringify';

// Taken from https://github.com/zeit/next-site/blob/master/lib/docs/markdown-to-html.js.
// Create the processor, the order of the plugins is important
const getProcessor = unified()
  .use(markdown)
  .use(remarkToRehype, { allowDangerousHtml: true })
  // Add custom HTML found in the markdown file to the AST
  .use(raw)
  // Sanitize the HTML
  .use(sanitize)
  // Add syntax highlighting to the sanitized HTML
  .use(prism)
  .use(html)
  .freeze();

export default async function markdownToHtml(md: string) {
  try {
    const processor = getProcessor();
    const file = await processor.process(md);

    // Replace non-breaking spaces (char code 160) with normal spaces to avoid style issues
    return file.contents.toString().replace(/\xA0/g, ' ');
  } catch (error) {
    console.error(`Markdown to HTML error: ${error}`);
    throw error;
  }
};