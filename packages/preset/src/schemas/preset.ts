import { MarkSpec, NodeSpec, Schema } from 'prosemirror-model';
import { edybaraBaseNodes } from '@edybara-editor/core';
import { EdybaraHeadingNodeConfigs, edybaraHeadingNodes } from '@edybara-editor/heading';
import {
  EdybaraParagraphNodeConfigs,
  edybaraParagraphNodes,
} from '@edybara-editor/paragraph';
import {
  EdybaraFlatBulletListNodeConfigs,
  EdybaraFlatListItemNodeConfigs,
  EdybaraFlatOrderedListNodeConfigs,
  edybaraFlatBulletListNodes,
  edybaraFlatListItemNodes,
  edybaraFlatOrderedListNodes,
} from '@edybara-editor/flat-list';
import {
  edybaraFlatTaskListNodes,
  edybaraFlatTaskListItemNodes,
  EdybaraFlatTaskListNodeConfigs,
  EdybaraFlatTaskListItemNodeConfigs,
} from '@edybara-editor/flat-task-list';
import {
  EdybaraHorizontalRuleNodeConfigs,
  edybaraHorizontalRuleNodes,
} from '@edybara-editor/hr';
import { EdybaraLinkMarkConfigs, edybaraLinkMarks } from '@edybara-editor/link';
import { EdybaraBoldMarkConfigs, edybaraBoldMarks } from '@edybara-editor/bold';
import { EdybaraCodeMarkConfigs, edybaraCodeMarks } from '@edybara-editor/code';
import {
  EdybaraFontFamilyMarkConfigs,
  edybaraFontFamilyMarks,
} from '@edybara-editor/font-family';
import { EdybaraItalicMarkConfigs, edybaraItalicMarks } from '@edybara-editor/italic';
import {
  EdybaraStrikethroughMarkConfigs,
  edybaraStrikethroughMarks,
} from '@edybara-editor/strikethrough';
import {
  EdybaraSubscriptMarkConfigs,
  edybaraSubscriptMarks,
} from '@edybara-editor/subscript';
import {
  EdybaraSuperscriptMarkConfigs,
  edybaraSuperscriptMarks,
} from '@edybara-editor/superscript';
import {
  EdybaraTextColorMarkConfigs,
  edybaraTextColorMarks,
} from '@edybara-editor/text-color';
import {
  EdybaraUnderlineMarkConfigs,
  edybaraUnderlineMarks,
} from '@edybara-editor/underline';
import {
  EdybaraBlockquoteNodeConfigs,
  edybaraBlockquoteNodes,
} from '@edybara-editor/blockquote';
import {
  EdybaraCodeBlockNodeConfigs,
  edybaraCodeBlockNodes,
} from '@edybara-editor/codeblock';
import { EdybaraMentionMarkConfigs, edybaraMentionMarks } from '@edybara-editor/mention';
import { EdybaraTableNodeConfigs, edybaraTableNodes } from '@edybara-editor/tables';

export interface EdybaraPresetSchemaConfigs {
  paragraph?: EdybaraParagraphNodeConfigs | null;
  heading?: EdybaraHeadingNodeConfigs | null;
  flatTaskList?: EdybaraFlatTaskListNodeConfigs | null;
  flatTaskListItem?: EdybaraFlatTaskListItemNodeConfigs | null;
  flatBulletList?: EdybaraFlatBulletListNodeConfigs | null;
  flatOrderedList?: EdybaraFlatOrderedListNodeConfigs | null;
  flatListItem?: EdybaraFlatListItemNodeConfigs | null;
  blockquote?: EdybaraBlockquoteNodeConfigs | null;
  horizontalRule?: EdybaraHorizontalRuleNodeConfigs | null;
  codeblock?: EdybaraCodeBlockNodeConfigs | null;
  table?: EdybaraTableNodeConfigs | null;

  bold?: EdybaraBoldMarkConfigs | null;
  italic?: EdybaraItalicMarkConfigs | null;
  underline?: EdybaraUnderlineMarkConfigs | null;
  strikethrough?: EdybaraStrikethroughMarkConfigs | null;
  code?: EdybaraCodeMarkConfigs | null;
  subscript?: EdybaraSubscriptMarkConfigs | null;
  superscript?: EdybaraSuperscriptMarkConfigs | null;
  fontFamily?: EdybaraFontFamilyMarkConfigs | null;
  textColor?: EdybaraTextColorMarkConfigs | null;
  link?: EdybaraLinkMarkConfigs | null;
  mention?: EdybaraMentionMarkConfigs | null;
}

const DEFAULT_CONFIGS: Required<EdybaraPresetSchemaConfigs> = {
  // nodes
  paragraph: {},
  heading: {},
  flatTaskList: {},
  flatTaskListItem: {},
  flatBulletList: {},
  flatOrderedList: {},
  flatListItem: {},
  blockquote: {},
  horizontalRule: {},
  codeblock: {},
  table: {},

  // marks
  bold: {},
  italic: {},
  underline: {},
  strikethrough: {},
  code: {},
  subscript: {
    superscriptMarkName: 'superscript',
  },
  superscript: {
    subscriptMarkName: 'subscript',
  },
  fontFamily: {},
  textColor: {},
  link: {},
  mention: {},
};

export const edybaraPresetSchema = (configs?: EdybaraPresetSchemaConfigs) => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const spec: {
    nodes: Record<string, NodeSpec>;
    marks: Record<string, MarkSpec>;
  } = {
    nodes: {
      ...edybaraBaseNodes(),
    },
    marks: {},
  };

  if (mergedConfigs.paragraph) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraParagraphNodes(mergedConfigs.paragraph),
    };
  }

  if (mergedConfigs.heading) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraHeadingNodes(mergedConfigs.heading),
    };
  }

  if (mergedConfigs.flatTaskList) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatTaskListNodes(mergedConfigs.flatTaskList),
    };
  }

  if (mergedConfigs.flatTaskListItem) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatTaskListItemNodes(mergedConfigs.flatTaskListItem),
    };
  }

  if (mergedConfigs.flatBulletList) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatBulletListNodes(mergedConfigs.flatBulletList),
    };
  }

  if (mergedConfigs.flatOrderedList) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatOrderedListNodes(mergedConfigs.flatOrderedList),
    };
  }

  if (mergedConfigs.flatListItem) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatListItemNodes(mergedConfigs.flatListItem),
    };
  }

  if (mergedConfigs.blockquote) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraBlockquoteNodes(mergedConfigs.blockquote),
    };
  }

  if (mergedConfigs.horizontalRule) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraHorizontalRuleNodes(mergedConfigs.horizontalRule),
    };
  }

  if (mergedConfigs.codeblock) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraCodeBlockNodes(mergedConfigs.codeblock),
    };
  }

  if (mergedConfigs.table) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraTableNodes(mergedConfigs.table),
    };
  }

  if (mergedConfigs.bold) {
    spec.marks = {
      ...spec.marks,
      ...edybaraBoldMarks(mergedConfigs.bold),
    };
  }

  if (mergedConfigs.italic) {
    spec.marks = {
      ...spec.marks,
      ...edybaraItalicMarks(mergedConfigs.italic),
    };
  }

  if (mergedConfigs.underline) {
    spec.marks = {
      ...spec.marks,
      ...edybaraUnderlineMarks(mergedConfigs.underline),
    };
  }

  if (mergedConfigs.strikethrough) {
    spec.marks = {
      ...spec.marks,
      ...edybaraStrikethroughMarks(mergedConfigs.strikethrough),
    };
  }

  if (mergedConfigs.code) {
    spec.marks = {
      ...spec.marks,
      ...edybaraCodeMarks(mergedConfigs.code),
    };
  }

  if (mergedConfigs.subscript) {
    spec.marks = {
      ...spec.marks,
      ...edybaraSubscriptMarks(mergedConfigs.subscript),
    };
  }

  if (mergedConfigs.superscript) {
    spec.marks = {
      ...spec.marks,
      ...edybaraSuperscriptMarks(mergedConfigs.superscript),
    };
  }

  if (mergedConfigs.fontFamily) {
    spec.marks = {
      ...spec.marks,
      ...edybaraFontFamilyMarks(mergedConfigs.fontFamily),
    };
  }

  if (mergedConfigs.textColor) {
    spec.marks = {
      ...spec.marks,
      ...edybaraTextColorMarks(mergedConfigs.textColor),
    };
  }

  if (mergedConfigs.link) {
    spec.marks = {
      ...spec.marks,
      ...edybaraLinkMarks(mergedConfigs.link),
    };
  }

  if (mergedConfigs.mention) {
    spec.marks = {
      ...spec.marks,
      ...edybaraMentionMarks(mergedConfigs.mention),
    };
  }

  return new Schema(spec);
};
