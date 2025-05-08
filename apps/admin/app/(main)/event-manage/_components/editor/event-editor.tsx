/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  handleCommandNavigation,
} from "novel";
import { useState } from "react";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";

import "@uket/ui/prosemirror.css";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

const extensions = [...defaultExtensions, slashCommand];

interface EventEditorProps {
  field: ControllerRenderProps<FieldValues, any>;
  id: string;
}

export default function EventEditor({ field, id }: EventEditorProps) {
  const [charsCount, setCharsCount] = useState(0);
  const debouncedUpdates = async (editor: EditorInstance) => {
    const json = editor.getJSON();

    setCharsCount(field.value.length);
    field.onChange(editor.storage.markdown.getMarkdown());

    window.localStorage.setItem(`novel-content-${id}`, JSON.stringify(json));
    window.localStorage.setItem(
      `markdown-${id}`,
      editor.storage.markdown.getMarkdown(),
    );
  };

  return (
    <div className="relative">
      <div className="flex absolute right-2 bottom-0 z-10 mb-2 gap-2">
        <div
          className={
            "rounded-lg px-2 py-1 text-sm text-muted-foreground text-[#CCCCCC]"
          }
        >
          {charsCount}/1,000
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={field.value}
          extensions={extensions}
          className="relative h-60 w-full border border-formInput bg-background sm:rounded-lg overflow-y-scroll"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class:
                "prose prose-sm dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-sm">
              결과가 없습니다.
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map(item => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={val => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-[#eeeeee] aria-selected:bg-[#eeeeee]"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
