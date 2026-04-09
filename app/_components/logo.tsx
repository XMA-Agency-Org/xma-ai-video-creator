import Image from "next/image";
import { cn } from "@/app/_lib/class-merge";
import LogoImg from "@/public/Logo Light.png"

type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 32, className }: LogoProps) {
  return (
    <Image
      src={LogoImg}
      alt="XMA logo"
      width={size}
      height={size}
      className={cn("rounded-lg", className)}
      style={{ width: size, height: "auto" }}
    />
  );
}
