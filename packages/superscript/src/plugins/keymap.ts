import { MarkType } from '@edybara/pm/model';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from '@edybara/pm/commands';

export interface EdybaraSuperscriptKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraSuperscriptKeymapPlugins = (
  configs: EdybaraSuperscriptKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Mod-Shift-.': toggleMark(configs.markType),
      'Mod-Shift->': toggleMark(configs.markType),
    }),
  ];
};
