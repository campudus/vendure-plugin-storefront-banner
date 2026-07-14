import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  BoldIcon,
  EraserIcon,
  ItalicIcon,
  Redo2Icon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { FontSize } from "./font-size.extension";
import "./BannerRichTextEditor.scss";

type BannerRichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  backgroundColor?: string;
};

const BUTTON_BASE = "h-8 px-2 inline-flex items-center justify-center rounded text-sm hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-0";

export function BannerRichTextEditor({ value, onChange, backgroundColor }: BannerRichTextEditorProps) {
  const { t } = useLingui();

  const fontSizes = [
    { label: "XS", value: "x-small" },
    { label: "S", value: "smaller" },
    { label: t`Smaller`, value: "small" },
    { label: t`Normal`, value: "" },
    { label: t`Larger`, value: "larger" },
    { label: "L", value: "large" },
    { label: "XL", value: "x-large" },
  ];

  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [pickerColor, setPickerColor] = useState("#000000");
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    return () => {
      if (colorDebounceRef.current) {
        clearTimeout(colorDebounceRef.current);
      }
    };
  }, []);

  const editor = useEditor(
    {
      extensions: [
        TextStyle.configure(),
        Color,
        FontSize,
        Underline,
        StarterKit,
      ],
      content: value ?? "",
      onUpdate: ({ editor }) => {
        isInternalUpdate.current = true;
        onChange(editor.isEmpty ? "" : editor.getHTML());
      },
      editorProps: {
        attributes: {
          class: "banner-rte-content",
        },
      },
    },
    [],
  );

  // Sync external value changes into the editor (e.g. loading a different banner)
  useLayoutEffect(() => {
    if (!editor) {
      return;
    }

    if (!isInternalUpdate.current) {
      const current = editor.isEmpty ? "" : editor.getHTML();
      const normalized = value ?? "";

      if (current !== normalized) {
        editor.commands.setContent(normalized, { emitUpdate: false });
      }
    }

    isInternalUpdate.current = false;
  }, [value, editor]);

  useEffect(() => {
    if (!colorPickerOpen) {
      return;
    }

    const handler = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setColorPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [colorPickerOpen]);

  const editorState = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      isBold: e?.isActive("bold") ?? false,
      isItalic: e?.isActive("italic") ?? false,
      isUnderline: e?.isActive("underline") ?? false,
      isStrike: e?.isActive("strike") ?? false,
      fontSize: (e?.getAttributes("textStyle").fontSize as string) ?? "",
      color: (e?.getAttributes("textStyle").color as string) ?? "#000000",
      canUndo: e?.can().undo() ?? false,
      canRedo: e?.can().redo() ?? false,
    }),
  });

  if (!editor) {
    return null;
  }

  const editorColor = editorState.color;
  const activeColor = colorPickerOpen ? pickerColor : editorColor;
  const activeFontSize = editorState.fontSize;
  const button = (active: boolean) => `${BUTTON_BASE} ${active ? "bg-accent" : "bg-transparent"}`;

  const handleColorPickerOpen = () => {
    setPickerColor(editorColor);
    setColorPickerOpen(open => !open);
  };

  const handleColorChange = (color: string) => {
    setPickerColor(color);

    if (colorDebounceRef.current) {
      clearTimeout(colorDebounceRef.current);
    }

    colorDebounceRef.current = setTimeout(() => {
      editor.chain().setColor(color).run();
    }, 40);
  };

  const handleFontSizeChange = (size: string) => {
    if (size) {
      editor.chain().focus().setFontSize(size).run();
    } else {
      editor.chain().focus().unsetFontSize().run();
    }
  };

  return (
    <div className="border rounded-md" data-testid="banner-rich-text-editor">
      <div className="flex items-center gap-0.5 p-2 border-b bg-muted/30 flex-wrap rounded-t-md">
        {/* Font size */}
        <select
          className="banner-rte-size-select"
          value={activeFontSize}
          onChange={e => handleFontSizeChange(e.target.value)}
        >
          {fontSizes.map(({ label, value }) => (
            <option key={label} value={value}>{label}</option>
          ))}
        </select>

        <div className="w-px h-5 bg-border mx-1" />

        <button
          type="button"
          className={button(editorState.isBold)}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          className={button(editorState.isItalic)}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          className={button(editorState.isUnderline)}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          className={button(editorState.isStrike)}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon className="h-4 w-4" />
        </button>

        {/* Text color */}
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            className={button(colorPickerOpen)}
            title={t`Text color`}
            onClick={handleColorPickerOpen}
          >
            <span className="flex flex-col items-center leading-none gap-[2px]">
              <span className="font-bold text-sm">A</span>
              <span className="block h-[3px] w-4 rounded-sm" style={{ backgroundColor: activeColor }} />
            </span>
          </button>

          {colorPickerOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 bg-background border rounded-md p-3 shadow-lg">
              <HexColorPicker
                color={pickerColor}
                onChange={handleColorChange}
              />
              <button
                type="button"
                className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground py-1 cursor-pointer border-0 bg-transparent"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setColorPickerOpen(false);
                }}
              >
                <Trans>Reset color</Trans>
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        <button
          type="button"
          className={button(false)}
          title={t`Reset formatting`}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <EraserIcon className="h-4 w-4" />
        </button>

        <div className="w-px h-5 bg-border mx-1" />

        <button
          type="button"
          className={button(false)}
          disabled={!editorState.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2Icon className="h-4 w-4" />
        </button>

        <button
          type="button"
          className={button(false)}
          disabled={!editorState.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2Icon className="h-4 w-4" />
        </button>
      </div>

      <div style={{ backgroundColor: backgroundColor || undefined }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
