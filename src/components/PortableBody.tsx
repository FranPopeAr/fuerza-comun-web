import { PortableText } from "@portabletext/react";

export function PortableBody({ value }: { value?: unknown[] }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <div className="portable-body">
      <PortableText value={value as never} />
    </div>
  );
}
