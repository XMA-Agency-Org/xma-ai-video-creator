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
  Users,
  Phone,
  Search,
  Camera,
  SlidersHorizontal,
  BookOpen,
  Check,
  X,
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
  Users,
  Phone,
  Search,
  Camera,
  SlidersHorizontal,
  BookOpen,
  Check,
  X,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? FileText;
}
