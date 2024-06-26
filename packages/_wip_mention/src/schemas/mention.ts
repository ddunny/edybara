import { MarkSpec } from '@edybara/pm/model';

export interface MentionAttrs {
  data_id: string;
}

export interface EdybaraMentionMarkConfigs {}

const DEFAULT_CONFIGS: Required<EdybaraMentionMarkConfigs> = {};

export const edybaraMentionMarks = (
  configs?: EdybaraMentionMarkConfigs,
): Record<string, MarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const markSpec: MarkSpec = {
    inclusive: false,
    excludes: '_',
    attrs: {
      data_id: {
        default: '',
      },
    },
    parseDOM: [
      {
        tag: 'span',
        getAttrs: (node) => {
          const dom = node as HTMLSpanElement;
          if (!dom.classList.contains('edybara-mention')) {
            return false;
          }
          return {
            data_id: dom.getAttribute('data-id') || '',
          };
        },
      },
      // for legacy
      {
        tag: 'a',
        getAttrs: (node) => {
          const dom = node as HTMLAnchorElement;
          const data_id = dom.dataset['mentionId'];
          if (!data_id) {
            return false;
          }
          return {
            data_id,
          };
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as MentionAttrs;
      return [
        'span',
        {
          class: 'edybara-mention',
          'data-id': attrs.data_id,
        },
        0,
      ];
    },
  };

  return {
    mention: markSpec,
  };
};
