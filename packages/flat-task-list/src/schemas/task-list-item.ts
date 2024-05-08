import { NodeSpec } from '@edybara/pm/model';
import {
  isQuillTaskList,
  parseQuillIndent,
  parseQuillTextAlign,
} from '@edybara/core';
import { createNode } from '../utils';

export const EDIM_DEFAULT_FLAT_TASK_LIST_ITEM_NODE_NAME = 'task_list_item';

export interface EdybaraFlatTaskListItemAttrs {
  indent: number;
  align: 'left' | 'right' | 'center' | null;
  checked: boolean;
}

export interface EdybaraFlatTaskListItemNodeConfigs {
  nodeName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraFlatTaskListItemNodeConfigs> = {
  nodeName: EDIM_DEFAULT_FLAT_TASK_LIST_ITEM_NODE_NAME,
};

export const edybaraFlatTaskListItemNodes = (
  configs?: EdybaraFlatTaskListItemNodeConfigs,
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
      checked: {
        default: false,
      },
    },
    parseDOM: [
      {
        tag: 'li',
        getAttrs(node) {
          const dom = node as HTMLLIElement;

          if (dom.classList.contains('edybara-list-item')) {
            return false;
          }

          const align = dom.getAttribute('data-text-align');
          const quillAlign = parseQuillTextAlign(dom);
          const indent = dom.dataset['indent'];
          const quillIndent = parseQuillIndent(dom);
          const checked = dom.dataset['checked'] === 'true';

          if (dom.parentElement && isQuillTaskList(dom.parentElement)) {
            return {
              align: align || quillAlign || null,
              indent: indent || quillIndent || 1,
              checked: dom.parentElement.dataset['checked'] === 'true',
            };
          }

          return {
            align: align || quillAlign || null,
            indent: indent || quillIndent || 1,
            checked: checked,
          };
        },
      },
    ],
    toDOM(node) {
      const li = createNode(node);
      return {
        dom: li,
        contentDOM: li,
      };
    },
    defining: true,
  };

  return {
    [mergedConfigs.nodeName]: nodeSpec,
  };
};
