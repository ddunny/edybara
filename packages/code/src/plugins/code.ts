import { MarkType } from 'prosemirror-model';
import { edybaraCodeKeymapPlugins } from './keymap';
import { edybaraCodeInputRulePlugins } from './input-rules';

export interface EdybaraCodePluginConfigs {
  markType: MarkType;
}

export const edybaraCodePlugins = (configs: EdybaraCodePluginConfigs) => {
  return [
    ...edybaraCodeKeymapPlugins(configs),
    ...edybaraCodeInputRulePlugins(configs),
  ];
};
