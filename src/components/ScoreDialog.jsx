import { useEffect, useRef } from "react";

function ScoreDialog({
  open,
  category,
  value,
  setValue,
  onSave,
  onClose,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 20,
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: 30,
          borderRadius: 15,
          minWidth: 320,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2>{category}</h2>

        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave();
            if (e.key === "Escape") onClose();
          }}
          style={{
            width: "100%",
            padding: 12,
            fontSize: 22,
            marginTop: 20,
            marginBottom: 25,
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <button onClick={() => setValue("")} style={{ flex: 1 }}>
            Rensa
          </button>

          <button onClick={onClose} style={{ flex: 1 }}>
            Avbryt
          </button>

          <button onClick={onSave} style={{ flex: 1 }}>
            Spara
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreDialog;