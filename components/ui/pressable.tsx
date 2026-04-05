import { Pressable as GluestackPressable } from "@gluestack-ui/button";
import { forwardRef } from "react";

export const Pressable = forwardRef<
  React.ElementRef<typeof GluestackPressable>,
  React.ComponentProps<typeof GluestackPressable>
>((props, ref) => {
  return <GluestackPressable {...props} ref={ref} />;
});

Pressable.displayName = "Pressable";
