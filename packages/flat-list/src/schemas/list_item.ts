import { NodeSpec } from '@edybara/pm/model';
import {
  isQuillTaskList,
  parseQuillIndent,
  parseQuillTextAlign,
} from '@edybara/core';

export const EDIM_FLAT_LIST_ITEM_DEFAULT_NODE_NAME = 'list_item';

export interface ListItemAttrs {
  indent: number;
  align: 'left' | 'right' | 'center' | null;
}

export interface EdybaraFlatListItemNodeConfigs {
  nodeName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraFlatListItemNodeConfigs> = {
  nodeName: EDIM_FLAT_LIST_ITEM_DEFAULT_NODE_NAME,
};

export const edybaraFlatListItemNodes = (
  configs?: EdybaraFlatListItemNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: NodeSpec = {
    content: 'paragraph',
    attrs: {
      indent: {
        default: 1,
      },
      align: {
        default: 'left',
      },
    },
    parseDOM: [
      {
        tag: 'li',
        getAttrs(node) {
          const dom = node as HTMLElement;
          const align = dom.getAttribute('data-text-align');
          const quillAlign = parseQuillTextAlign(dom);
          const indent = dom.dataset['indent'];
          const quillIndent = parseQuillIndent(dom);

          if (dom.parentElement && isQuillTaskList(dom.parentElement)) {
            return false;
          }

          return {
            align: align || quillAlign || null,
            indent: indent || quillIndent || 1,
          };
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as ListItemAttrs;
      return [
        'li',
        {
          class: `edybara-list-item edybara-list-item-indent-${attrs.indent || 1} ${
            attrs.align ? ` edybara-align-${attrs.align}` : ''
          }`,
          'data-text-align': attrs.align || 'left',
          'data-indent': attrs.indent || 1,
        },
        0,
      ];
    },
    defining: true,
  };

  return {
    [mergedConfigs.nodeName]: nodeSpec,
  };
};
