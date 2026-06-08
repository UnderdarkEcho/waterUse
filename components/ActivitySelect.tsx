"use client";

import { activities } from "@/lib/activities";
import { ActivityIcon } from "@/lib/icons";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ActivitySelectProps {
  value: string;
  onChange: (id: string) => void;
}

export function ActivitySelect({ value, onChange }: ActivitySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = activities.find((a) => a.id === value);

  const filtered = activities.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative min-w-0">
      <label className="block text-sm font-medium text-neutral mb-2">
        Activity
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-xl border border-border bg-background text-left hover:border-primary/50 transition-colors min-h-[52px] min-w-0"
      >
        {selected && (
          <ActivityIcon name={selected.icon} className="w-5 h-5 text-primary shrink-0" />
        )}
        <span className="flex-1 min-w-0 font-medium truncate">
          {selected?.name ?? "Select an activity"}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-neutral shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {selected?.description && (
        <p className="text-xs text-neutral mt-2 leading-relaxed">
          {selected.description}
        </p>
      )}

      {open && (
        <div className="absolute z-30 mt-2 left-0 right-0 max-w-full rounded-xl border border-border bg-background shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <Search className="w-4 h-4 text-neutral shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search activities..."
              className="w-full min-w-0 bg-transparent outline-none text-sm py-1"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {filtered.map((activity) => (
              <li key={activity.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(activity.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-primary/5 transition-colors min-w-0 ${
                    activity.id === value ? "bg-primary/10" : ""
                  }`}
                >
                  <ActivityIcon
                    name={activity.icon}
                    className="w-5 h-5 text-primary shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{activity.name}</p>
                    <p className="text-xs text-neutral capitalize truncate">
                      {activity.category}
                    </p>
                  </div>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-neutral">
                No activities found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}