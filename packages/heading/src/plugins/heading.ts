import { edybaraHeadingInputRulePlugins } from './input-rules';
import { edybaraHeadingKeymapPlugins } from './keymaps';
import { NodeType } from 'prosemirror-model';

export interface EdybaraHeadingPluginConfigs {
  nodeType: NodeType;
}

export const edybaraHeadingPlugins = (configs: EdybaraHeadingPluginConfigs) => {
  return [
    ...edybaraHeadingInputRulePlugins(configs),
    ...edybaraHeadingKeymapPlugins(configs),
  ];
};
