import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState, Plugin } from '@edybara/pm/state';
import React, { useState } from 'react';
import { Schema } from '@edybara/pm/model';
import {
  edybaraDocNodes,
  edybaraTextNodes,
  edybaraCorePlugins,
} from '@edybara/core';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import { edybaraMenubarPlugins } from '@edybara/menubar';
import {
  edybaraSuperscriptMarks,
  edybaraSuperscriptPlugins,
} from '@edybara/superscript';

const schema = new Schema({
  nodes: {
    ...edybaraDocNodes(),
    ...edybaraTextNodes(),
    ...edybaraParagraphNodes(),
  },
  marks: {
    ...edybaraSuperscriptMarks(),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraSuperscriptPlugins({
    markType: schema.marks['superscript'],
  }),
  ...edybaraMenubarPlugins({
    textStyles: {
      superscriptMarkType: schema.marks['superscript'],
    },
  }),
  ...edybaraCorePlugins(),
];

export const SuperscriptExample = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
      doc: schema.nodeFromJSON({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a minimal example of a ProseMirror editor with a few plugins.',
              },
            ],
          },
        ],
      }),
      schema: schema,
      plugins: plugins,
    }),
  );

  return (
    <ProseMirror
      state={state}
      style={{ height: '300px' }}
      className="border"
      {...props}
    />
  );
};
