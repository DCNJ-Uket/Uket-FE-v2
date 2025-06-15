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
import { useRef, useState } from "react";
import { defaultExtensions } from "./extensions";
import { suggestionItems } from "./slash-command";

import "@uket/ui/prosemirror.css";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import EditorMenuBar from "./editor-menu-bar";

const extensions = [...defaultExtensions];

interface EventEditorProps {
  field: ControllerRenderProps<FieldValues, any>;
  id: string;
  enableAutoBulletList?: boolean; // bullet list 자동 변환 옵션
}

export default function EventEditor({
  field,
  id,
  enableAutoBulletList = false,
}: EventEditorProps) {
  const [charsCount, setCharsCount] = useState(field.value.length || 0);
  const [editor, setEditor] = useState<EditorInstance | null>(null);
  const editorRef = useRef<EditorInstance | null>(null);

  const debouncedUpdates = async () => {
    if (!editor) return;

    const json = editor.getJSON();

    setCharsCount(field.value.length);
    field.onChange(editor.storage.markdown.getMarkdown());

    window.localStorage.setItem(`novel-content-${id}`, JSON.stringify(json));
    window.localStorage.setItem(
      `markdown-${id}`,
      editor.storage.markdown.getMarkdown(),
    );
  };

  const ensureBulletList = (editor: EditorInstance) => {
    if (!editor.isActive("bulletList")) {
      editor.chain().focus().toggleList("bulletList", "listItem").run();
    }
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
        {editor && <EditorMenuBar editor={editor} />}
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
            handleKeyDown: (view, event) => {
              // enableAutoBulletList가 false면 기본 동작만 수행
              if (!enableAutoBulletList) return false;

              const { state } = view;
              const { selection } = state;
              const { $from } = selection;
              const editor = editorRef.current;

              if (!editor) return false;

              // Enter 키 처리 - 새로운 리스트 아이템 생성
              if (event.key === "Enter") {
                if (editor.isActive("bulletList")) {
                  // 이미 bulletList 안에 있으면 새 리스트 아이템 생성
                  editor.chain().focus().splitListItem("listItem").run();
                } else {
                  // bulletList가 아니면 변환
                  ensureBulletList(editor);
                }
                return true; // 기본 동작 방지
              }

              // 일반 문자 입력 시 bulletList 확인
              if (
                event.key.length === 1 &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.altKey
              ) {
                // 현재 노드가 paragraph이거나 bulletList가 아닌 경우에만 변환
                if (
                  $from.node().type.name === "paragraph" ||
                  !editor.isActive("bulletList")
                ) {
                  setTimeout(() => {
                    ensureBulletList(editor);
                  }, 0);
                }
              }

              return false;
            },
          }}
          onUpdate={() => debouncedUpdates()}
          onCreate={({ editor }) => {
            setEditor(editor);
            editorRef.current = editor;

            // enableAutoBulletList가 true이고 초기 상태가 비어있으면 bulletList로 시작
            if (enableAutoBulletList && editor.isEmpty) {
              setTimeout(() => {
                ensureBulletList(editor);
              }, 100);
            }
          }}
          onFocus={({ editor }) => {
            // enableAutoBulletList가 false면 자동 변환하지 않음
            if (!enableAutoBulletList) return;

            // 포커스 시 bulletList가 아니면 변환 (단, 이미 포커스가 있는 경우 제외)
            if (!editor.isFocused) return;

            if (!editor.isActive("bulletList")) {
              if (editor.isEmpty) {
                ensureBulletList(editor);
              } else {
                // 기존 내용을 bulletList로 변환하되, 각 줄을 개별 리스트 아이템으로
                const content = editor.getText();
                const lines = content.split("\n").filter(line => line.trim());

                if (lines.length > 0) {
                  editor.chain().focus().clearContent().run();

                  // 첫 번째 줄로 bulletList 시작
                  editor
                    .chain()
                    .focus()
                    .toggleList("bulletList", "listItem")
                    .insertContent(lines[0]!)
                    .run();

                  // 나머지 줄들을 새로운 리스트 아이템으로 추가
                  lines.slice(1).forEach(line => {
                    editor
                      .chain()
                      .focus()
                      .splitListItem("listItem")
                      .insertContent(line)
                      .run();
                  });
                }
              }
            }
          }}
          onBlur={({ editor }) => {
            // enableAutoBulletList가 true이고 완전히 비어있으면 bulletList로 초기화
            if (enableAutoBulletList && editor.isEmpty) {
              setTimeout(() => {
                ensureBulletList(editor);
              }, 50);
            }
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
