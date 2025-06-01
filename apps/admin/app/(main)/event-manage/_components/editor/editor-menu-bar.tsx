import { Button } from "@ui/components/ui/button";
import { BoldIcon, ListIcon, UnderlineIcon } from "@ui/components/ui/icon";
import { cn } from "@ui/lib/utils";
import { EditorInstance } from "novel";

type Command = "bold" | "underline" | "bulletList";

interface EditorMenuBarProps {
  editor: EditorInstance;
  activeCommandList?: Command[];
}

const activeStyle = "bg-secondary";
const nonActiveStyle = "hover:bg-secondary/80";

export default function EditorMenuBar({
  editor,
  activeCommandList = ["bold", "underline", "bulletList"],
}: EditorMenuBarProps) {
  return (
    <header className="mb-2">
      <nav className="flex items-center gap-2">
        {activeCommandList.includes("bold") && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              editor.isActive("bold") ? activeStyle : nonActiveStyle,
            )}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon size={16} />
          </Button>
        )}
        {activeCommandList.includes("underline") && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              editor.isActive("underline") ? activeStyle : nonActiveStyle,
            )}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={16} />
          </Button>
        )}
        {activeCommandList.includes("bulletList") && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              editor.isActive("bulletList") ? activeStyle : nonActiveStyle,
            )}
            onClick={() =>
              editor.chain().focus().toggleList("bulletList", "listItem").run()
            }
          >
            <ListIcon size={16} />
          </Button>
        )}
      </nav>
    </header>
  );
}
