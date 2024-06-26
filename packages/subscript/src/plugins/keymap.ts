import { MarkType } from '@edybara/pm/model';
import { keymap } from '@edybara/pm/keymap';
import { toggleMark } from '@edybara/pm/commands';

export interface EdybaraSubscriptKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraSubscriptKeymapPlugins = (
  configs: EdybaraSubscriptKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Mod-Shift-,': toggleMark(configs.markType),
      'Mod-Shift-<': toggleMark(configs.markType),
    }),
  ];
};
