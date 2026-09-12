type Child = { _key?: string; text?: string };
type Block = { _key?: string; _type?: string; style?: string; children?: Child[]; listItem?: string };

function blockText(block: Block) { return block.children?.map((child) => child.text || "").join("") || ""; }

export function PortableBody({ value }: { value?: unknown[] }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  const blocks = value as Block[];
  return <div className="portable-body">{blocks.map((block, index) => {
    const text = blockText(block);
    const key = block._key || String(index);
    if (!text) return null;
    if (block.style === "h2") return <h2 key={key}>{text}</h2>;
    if (block.style === "h3") return <h3 key={key}>{text}</h3>;
    if (block.style === "blockquote") return <blockquote key={key}>{text}</blockquote>;
    if (block.listItem) return <p key={key}>• {text}</p>;
    return <p key={key}>{text}</p>;
  })}</div>;
}
