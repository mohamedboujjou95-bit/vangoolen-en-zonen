import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStarArray } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export function StarRating({ rating, size = "md", showNumber = false, className }: StarRatingProps) {
  const stars = getStarArray(rating);
  const sizeClass = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" }[size];

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {stars.map((type, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            type === "full"  && "fill-gold-DEFAULT text-gold-DEFAULT",
            type === "half"  && "fill-gold-light  text-gold-DEFAULT",
            type === "empty" && "fill-none        text-gold-light",
          )}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-xs font-semibold text-secondary-600">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
