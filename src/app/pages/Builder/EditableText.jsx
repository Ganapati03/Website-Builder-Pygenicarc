import React, { useRef, useState, useCallback, useEffect } from 'react';

/**
 * EditableText — Inline content-editable text component for the builder canvas.
 *
 * Props:
 *  - value        : string — Current text content
 *  - onSave       : (newValue: string) => void — Called on blur / Enter
 *  - tag          : string — Wrapper element tag ('h1', 'h2', 'p', 'span', etc.) [default: 'div']
 *  - className    : string — Additional Tailwind / CSS classes
 *  - style        : object — Inline styles forwarded to the wrapper
 *  - placeholder  : string — Shown when value is empty
 *  - multiline    : boolean — Allow Enter to create newlines (false = save on Enter)
 *  - disabled     : boolean — If true, render static (non-editable) text
 *  - children     : React.ReactNode — fallback content if value is empty
 */
const EditableText = ({
  value = '',
  onSave,
  tag = 'div',
  className = '',
  style = {},
  placeholder = 'Click to edit…',
  multiline = false,
  disabled = false,
  children,
}) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const savedValue = useRef(value);

  // Keep the savedValue in sync when value changes externally
  useEffect(() => {
    savedValue.current = value;
  }, [value]);

  // Strip HTML tags — safety against pasted rich content
  const sanitize = (raw) => {
    if (!raw) return '';
    const div = document.createElement('div');
    div.innerHTML = raw;
    return div.textContent.trim();
  };

  const commitEdit = useCallback(() => {
    if (!ref.current || !onSave) return;
    const newVal = sanitize(ref.current.innerText);
    if (newVal !== savedValue.current) {
      savedValue.current = newVal;
      onSave(newVal);
    }
    setIsEditing(false);
  }, [onSave]);

  const cancelEdit = useCallback(() => {
    if (ref.current) {
      ref.current.innerText = savedValue.current || '';
    }
    setIsEditing(false);
  }, []);

  const handleClick = useCallback((e) => {
    if (disabled) return;
    // Stop propagation so we don't trigger the DraggableElement select/drag
    e.stopPropagation();
    setIsEditing(true);
    // Focus the element after React re-renders
    requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.focus();
        // Place cursor at end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(ref.current);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    });
  }, [disabled]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
      return;
    }
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      commitEdit();
      return;
    }
    // Prevent keyboard shortcuts from bubbling (e.g. Delete/Backspace deleting blocks)
    e.stopPropagation();
  }, [multiline, commitEdit, cancelEdit]);

  const handleBlur = useCallback(() => {
    commitEdit();
  }, [commitEdit]);

  // Prevent paste from injecting HTML
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  // Determine the Tag to render
  const Tag = tag;

  // Build the editable/hover styles
  const editableStyles = disabled
    ? {}
    : {
        cursor: isEditing ? 'text' : 'pointer',
        outline: 'none',
        minWidth: '1ch',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        borderRadius: '4px',
        ...(isEditing
          ? {
              boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.4)',
              background: 'rgba(99, 102, 241, 0.04)',
            }
          : {}),
      };

  const displayValue = value || '';
  const isEmpty = !displayValue;

  if (disabled) {
    return (
      <Tag className={className} style={style}>
        {children || displayValue}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      contentEditable={isEditing}
      suppressContentEditableWarning
      className={`editable-text ${className} ${!isEditing ? 'editable-text--hover' : 'editable-text--active'}`}
      style={{ ...style, ...editableStyles }}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onPointerDown={(e) => {
        if (isEditing) {
          e.stopPropagation(); // Prevent drag while editing
        }
      }}
      data-placeholder={isEmpty && !isEditing ? placeholder : undefined}
    >
      {isEditing ? undefined : (displayValue || placeholder)}
    </Tag>
  );
};

export default EditableText;
