/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export const useTextarea = (field: ControllerRenderProps<FieldValues, any>) => {
  const [value, setValue] = useState(field.value || "• ");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    field.onChange(newValue); // Update form field value
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const lines = newValue.split("\n");

    // Process each line to ensure bullet points
    const processedLines = lines.map((line, index) => {
      // Keep empty lines as is
      if (line.trim() === "") {
        return line;
      }

      // Already has bullet point
      if (line.startsWith("• ")) {
        return line;
      }

      // Add bullet point if line has content
      if (line.trim() !== "") {
        // Preserve indentation for wrapped lines
        const isWrappedLine =
          index > 0 && lines[index - 1]!.endsWith("  ") && line.trim() !== "•";
        return isWrappedLine ? `  ${line}` : `• ${line.trimStart()}`;
      }

      return line;
    });

    updateValue(processedLines.join("\n"));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Skip if composing (for IME input)
    if (e.nativeEvent.isComposing || e.keyCode === 229) {
      return;
    }

    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPosition);
    const textAfterCursor = value.substring(textarea.selectionEnd);

    if (e.key === "Enter") {
      e.preventDefault();

      // Find current line
      const lastNewlineIndex = textBeforeCursor.lastIndexOf("\n");
      const currentLineStart = lastNewlineIndex + 1;
      const currentLine = textBeforeCursor.substring(currentLineStart);

      // Don't add new bullet if current line is empty bullet
      if (currentLine.trim() === "•" || currentLine === "• ") {
        return;
      }

      // Check for indentation (spaces before bullet)
      const indentMatch = currentLine.match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1] : "";

      // Add new bullet point with same indentation
      const newText = `${textBeforeCursor}\n${indent}• ${textAfterCursor}`;
      updateValue(newText);

      // Move cursor after the new bullet point
      setTimeout(() => {
        const newCursorPos = cursorPosition + indent.length + 3; // +3 for "\n• "
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    } else if (e.key === "Backspace") {
      // Handle backspace at start of bullet point
      const lastNewlineIndex = textBeforeCursor.lastIndexOf("\n");
      const currentLineStart = lastNewlineIndex + 1;
      const currentLineBeforeCursor =
        textBeforeCursor.substring(currentLineStart);

      // If at start of a bullet point
      if (currentLineBeforeCursor === "• " && cursorPosition > 0) {
        e.preventDefault();

        // Find the end of current line
        const nextNewlineIndex = textAfterCursor.indexOf("\n");
        const currentLineEnd =
          nextNewlineIndex === -1
            ? value.length
            : cursorPosition + nextNewlineIndex;

        // Remove current line
        const beforeCurrentLine = value.substring(
          0,
          lastNewlineIndex === -1 ? 0 : lastNewlineIndex,
        );
        const afterCurrentLine = value.substring(currentLineEnd);

        const newValue =
          beforeCurrentLine +
          (afterCurrentLine.startsWith("\n") ? afterCurrentLine : "");
        updateValue(newValue === "" ? "• " : newValue);

        // Position cursor at end of previous line
        setTimeout(() => {
          const newCursorPos = beforeCurrentLine.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Add two spaces for indentation
      const newText = `${textBeforeCursor}  ${textAfterCursor}`;
      updateValue(newText);

      // Move cursor after the spaces
      setTimeout(() => {
        const newCursorPos = cursorPosition + 2;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const lines = pastedText.split("\n");

    // Convert pasted text to bullet points
    const bulletLines = lines.map(line => {
      if (line.trim() === "") return "";
      if (line.startsWith("• ")) return line;
      return `• ${line.trimStart()}`;
    });

    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPosition);
    const textAfterCursor = value.substring(textarea.selectionEnd);

    const newValue = `${textBeforeCursor}${bulletLines.join("\n")}${textAfterCursor}`;
    updateValue(newValue);

    // Move cursor to end of pasted text
    setTimeout(() => {
      const newCursorPos = cursorPosition + bulletLines.join("\n").length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return {
    value,
    handleChange,
    handleKeyDown,
    handlePaste,
    textareaRef,
  };
};
