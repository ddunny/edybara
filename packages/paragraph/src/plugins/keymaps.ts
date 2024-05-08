import { NodeType } from '@edybara/pm/model';
import { keymap } from 'prosemirror-keymap';
import { setBlockType } from '@edybara/pm/commands';
import { mac } from '@edybara/core';

export interface EdybaraParagraphKeymapPluginConfigs {
  nodeType: NodeType;
}

export const edybaraParagraphKeymapPlugins = (
  configs: EdybaraParagraphKeymapPluginConfigs,
) => {
  const key = mac ? 'Alt-Meta-º' : 'Ctrl-Alt-0';
  return [
    keymap({
      [key]: setBlockType(configs.nodeType),
    }),
  ];
};
