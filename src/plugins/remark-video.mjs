import { visit } from 'unist-util-visit';

/**
 * Remark plugin: transforms ![alt](*.mp4) into <video> elements.
 * Outputs raw HTML so the video tag passes through to the final page.
 */
export default function remarkVideo() {
  return (tree) => {
    visit(tree, 'image', (node, index, parent) => {
      if (!node.url || !node.url.endsWith('.mp4')) return;

      const alt = node.alt || '';
      const html = `<video src="${node.url}" autoplay muted loop playsinline aria-label="${alt}" style="width:100%;height:auto;display:block;"></video>`;

      parent.children[index] = {
        type: 'html',
        value: html,
      };
    });
  };
}
