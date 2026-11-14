import { useId, useRef, type ReactNode } from 'react';
import { closeDialog, openDialog } from './dialogControls';

export function InfoDialog({
  title,
  trigger,
  children,
  triggerClassName = 'story-info-button',
}: {
  title: string;
  trigger: ReactNode;
  children: ReactNode;
  triggerClassName?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        aria-haspopup="dialog"
        onClick={() => openDialog(dialogRef.current)}
      >
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        className="story-dialog"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog(dialogRef.current);
        }}
      >
        <div className="story-dialog__head">
          <h3 id={titleId}>{title}</h3>
          <button
            type="button"
            className="story-dialog__close"
            aria-label="Dialog schließen"
            onClick={() => closeDialog(dialogRef.current)}
          >
            ×
          </button>
        </div>
        <div className="story-dialog__body">{children}</div>
      </dialog>
    </>
  );
}
