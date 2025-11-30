import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-blue-200 animate-pulse duration-75 rounded-md opacity-30", className)}
      {...props}
    />
  )
}

export { Skeleton }
