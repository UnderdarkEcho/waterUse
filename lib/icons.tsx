import {
  Car,
  Coffee,
  Droplets,
  Flag,
  Flower2,
  Footprints,
  Globe,
  Mail,
  MessagesSquare,
  Music,
  Plane,
  Play,
  Send,
  Shirt,
  ShowerHead,
  Smartphone,
  Sparkles,
  Tv,
  Utensils,
  Video,
  Wind,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  "messages-square": MessagesSquare,
  mail: Mail,
  tv: Tv,
  play: Play,
  music: Music,
  smartphone: Smartphone,
  video: Video,
  globe: Globe,
  send: Send,
  car: Car,
  plane: Plane,
  flower: Flower2,
  flag: Flag,
  footprints: Footprints,
  shirt: Shirt,
  utensils: Utensils,
  coffee: Coffee,
  wind: Wind,
  droplets: Droplets,
  "shower-head": ShowerHead,
};

export function ActivityIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Droplets;
  return <Icon className={className} aria-hidden />;
}