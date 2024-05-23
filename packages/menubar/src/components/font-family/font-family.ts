import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import { EdybaraParagraph, EdybaraSelect, classes, html } from '@edybara/ui';
import {
  EdybaraFontFamilyAttrs,
  EdybaraFontFamilyMarkType,
  setFontFamily,
} from '@edybara/font-family';
import { markActive } from '@edybara/core';

export const EdybaraMenubarFontFamilySelect = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options?.fontFamily) {
    return null;
  }

  const fontFamilyMarkType = context.editorView.state.schema.marks[
    'font_family'
  ] as EdybaraFontFamilyMarkType;
  const currentMark = markActive(context.editorView.state, fontFamilyMarkType);
  const currentFont =
    (currentMark?.attrs as EdybaraFontFamilyAttrs | null)?.fontFamily ||
    'default';

  const fontOptions = [
    {
      value: 'default',
      command: () => {
        const tr =
          context.editorView.state.tr.removeStoredMark(fontFamilyMarkType);
        context.editorView.dispatch(tr);
        context.editorView.focus();
      },
    },
    ...fontFamilyMarkType.spec.fonts.map((font) => ({
      value: font.fontFamily,
      command: () => {
        setFontFamily(fontFamilyMarkType, {
          fontFamily: font.fontFamily,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    })),
  ];
  return html`
    <${EdybaraSelect.Root} 
      className="${classes('edybara-menubar-font-select')}"
      value="${currentFont}">
      <${EdybaraSelect.Text}>
        <${EdybaraParagraph}>
          ${
            fontOptions.find((option) => option.value === currentFont)?.value ||
            ''
          }
        </${EdybaraParagraph}>
      </${EdybaraSelect.Text}>
      <${EdybaraSelect.OptionGroup}>
        ${fontOptions.map((option) => {
          return html`
            <${EdybaraSelect.Option} value="${option.value}" onClick=${option.command}>
              <${EdybaraParagraph} style="font-family: ${option.value};">${option.value}</${EdybaraParagraph}> 
            </${EdybaraSelect.Option}>
          `;
        })}
      </${EdybaraSelect.OptionGroup}>
    </${EdybaraSelect.Root}>
  `;
};
