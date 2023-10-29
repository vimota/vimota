import { unified } from 'unified'
import remarkParse from 'remark-parse';
import raw from 'rehype-raw';
import sanitize from 'rehype-sanitize';
import prism from '@mapbox/rehype-prism';
import html from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import remarkRehype from 'remark-rehype';

const removeParagraphsInListItems = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'li' && node.children.length === 3 && node.children[1].tagName === 'p') {
        node.children = node.children[1].children;
      }
    });
  };
};


// Taken from https://github.com/zeit/next-site/blob/master/lib/docs/markdown-to-html.js.
// Create the processor, the order of the plugins is important
const getProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(removeParagraphsInListItems)
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
    return file.toString().replace(/\xA0/g, ' ');
  } catch (error) {
    console.error(`Markdown to HTML error: ${error}`);
    throw error;
  }
};