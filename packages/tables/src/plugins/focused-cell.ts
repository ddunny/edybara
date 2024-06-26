import { Plugin as PMPlugin, PluginKey } from '@edybara/pm/state';
import { Decoration, DecorationSet } from '@edybara/pm/view';
import { findCellClosestToPos } from '../utils';

export const focusedCellPluginKey = new PluginKey<DecorationSet>(
  'focusedCellPlugin',
);

export const edybaraFocusedCellDecorationPlugins = (): PMPlugin[] => {
  const plugin: PMPlugin<DecorationSet> = new PMPlugin<DecorationSet>({
    key: focusedCellPluginKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr) {
        const selection = tr.selection;
        const cell = findCellClosestToPos(selection.$from);
        if (!cell) {
          return DecorationSet.empty;
        }
        const classDeco = Decoration.node(
          cell.pos,
          cell.pos + cell.node.nodeSize,
          {
            class: 'edybara-focused-cell',
          },
        );
        return DecorationSet.create(tr.doc, [classDeco]);
      },
    },
    props: {
      decorations(state) {
        return plugin.getState(state);
      },
    },
  });
  return [plugin];
};
