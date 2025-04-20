"use client";

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
  handleCommandNavigation,
} from "novel";
import { useEffect, useState } from "react";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";

import "@uket/ui/prosemirror.css";

const extensions = [...defaultExtensions, slashCommand];

export default function EventEditor() {
  const [initialContent, setInitialContent] = useState<JSONContent>();
  const [charsCount, setCharsCount] = useState();

  const debouncedUpdates = async (editor: EditorInstance) => {
    const json = editor.getJSON();
    setCharsCount(editor.storage.characterCount.words());
    window.localStorage.setItem("novel-content", JSON.stringify(json));
    window.localStorage.setItem(
      "markdown",
      editor.storage.markdown.getMarkdown(),
    );
  };

  useEffect(() => {
    const content = window.localStorage.getItem("novel-content");
    if (content) setInitialContent(JSON.parse(content));
  }, []);

  return (
    <div className="relative">
      <div className="flex absolute right-5 bottom-0 z-10 mb-5 gap-2">
        <div
          className={
            charsCount
              ? "rounded-lg px-2 py-1 text-sm text-muted-foreground"
              : "hidden"
          }
        >
          {charsCount}/1,000
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="relative h-60 w-full border border-formInput bg-background sm:rounded-lg"
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
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map(item => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={val => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
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
