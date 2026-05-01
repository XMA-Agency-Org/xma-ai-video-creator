import Image from "next/image";
import { cn } from "@/app/_lib/class-merge";
import LogoImg from "@/public/XMA-Purple.png"

type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 32, className }: LogoProps) {
  return (
    <Image
      src={LogoImg}
      alt="XMA logo"
      width={881}
      height={896}
      className={cn("rounded-lg", className)}
      style={{ height: size, width: "auto" }}
    />
  );
}
