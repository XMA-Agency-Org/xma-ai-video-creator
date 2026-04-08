import {
  FileText,
  Sparkles,
  Eye,
  Send,
  Zap,
  TrendingUp,
  Clock,
  Play,
  Video,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Sparkles,
  Eye,
  Send,
  Zap,
  TrendingUp,
  Clock,
  Play,
  Video,
  Palette,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? FileText;
}
