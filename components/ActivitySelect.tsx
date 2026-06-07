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
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-neutral mb-2">
        Activity
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background text-left hover:border-primary/50 transition-colors min-h-[52px]"
      >
        {selected && (
          <ActivityIcon name={selected.icon} className="w-5 h-5 text-primary shrink-0" />
        )}
        <span className="flex-1 font-medium truncate">
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
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-background shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <Search className="w-4 h-4 text-neutral shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search activities..."
              className="w-full bg-transparent outline-none text-sm py-1"
              autoFocus
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
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary/5 transition-colors ${
                    activity.id === value ? "bg-primary/10" : ""
                  }`}
                >
                  <ActivityIcon
                    name={activity.icon}
                    className="w-5 h-5 text-primary shrink-0"
                  />
                  <div>
                    <p className="font-medium text-sm">{activity.name}</p>
                    <p className="text-xs text-neutral capitalize">
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