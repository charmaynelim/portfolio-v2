import { visit } from 'unist-util-visit';

/**
 * Remark plugin: transforms :::annotation{side="right" arrow="curve-left"}
 * directives into margin-note HTML with individually positionable text and arrow.
 *
 * Attributes:
 *   side (required): "left" or "right"
 *   arrow (optional): filename stem of SVG in public/images/annotations/
 *   textX, textY: translate offset for annotation text
 *   arrowX, arrowY: translate offset for arrow image
 *   arrowRotate: rotation for arrow image (e.g. "15deg")
 *
 * Requires remark-directive registered BEFORE this plugin.
 */
export default function remarkAnnotations() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' &&
        node.name === 'annotation'
      ) {
        const attrs = node.attributes || {};
        const side = attrs.side || 'right';
        const arrow = attrs.arrow || '';

        // Build inline style for text transform
        const textX = attrs.textX || '0px';
        const textY = attrs.textY || '0px';
        const textStyle = `--text-x:${textX};--text-y:${textY}`;

        // Build inline style for arrow transform
        const arrowX = attrs.arrowX || '0px';
        const arrowY = attrs.arrowY || '0px';
        const arrowRotate = attrs.arrowRotate || '0deg';
        const arrowStyle = `--arrow-x:${arrowX};--arrow-y:${arrowY};--arrow-rotate:${arrowRotate}`;

        const text = extractText(node);

        let arrowHtml = '';
        if (arrow) {
          arrowHtml = `<img class="annotation-arrow" src="/images/annotations/${arrow}.svg" alt="" style="${arrowStyle}" />`;
        }

        const html = `<div class="annotation" data-side="${side}" data-arrow="${arrow}"><span class="annotation-text" style="${textStyle}">${text}</span>${arrowHtml}</div>`;

        node.type = 'html';
        node.value = html;
        node.children = undefined;
      }
    });
  };
}

function extractText(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(extractText).join('');
  return '';
}
