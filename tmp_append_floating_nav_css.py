from pathlib import Path
p = Path(r'C:\Users\kaika\.openclaw\workspace\albany-redesign V.4\styles.css')
css = p.read_text(encoding='utf-8')
append = '''

/* Floating quick nav for roster */
.floating-return-nav {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.floating-return-btn,
.floating-return-nav .back-to-top {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: 1px solid rgba(245,241,234,0.12);
  background: rgba(199, 164, 106, 0.95);
  color: #111;
  display: grid;
  place-items: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.35);
  transition: 0.2s ease;
}

.floating-return-btn:hover,
.floating-return-nav .back-to-top:hover {
  transform: translateY(-2px);
  background: var(--accent-hover);
}

.floating-return-btn svg,
.floating-return-nav .back-to-top svg {
  width: 20px;
  height: 20px;
}

.floating-return-nav .back-to-top {
  position: static;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(12px);
  cursor: pointer;
}

.floating-return-nav .back-to-top.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}
'''
if '/* Floating quick nav for roster */' not in css:
    css += append
p.write_text(css, encoding='utf-8')
print('ok')