import { getSource } from "@/lib/sources";

export function Cite({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline font-medium"
    >
      {children}
    </a>
  );
}

export function SourceList({ ids }: { ids: string[] }) {
  return (
    <ul className="list-none space-y-2 text-sm">
      {ids.map((id, i) => {
        const src = getSource(id);
        if (!src) return null;
        return (
          <li key={id} className="flex gap-2">
            <span className="text-neutral shrink-0">[{i + 1}]</span>
            <span>
              <Cite href={src.url}>{src.label}</Cite>
              {src.note && (
                <span className="text-neutral"> — {src.note}</span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}