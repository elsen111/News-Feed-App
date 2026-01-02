import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonUI() {
  return (
    <div className="grid grid-cols-1 gap-y-[30px] gap-x-5 sm:gap-y-[50px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Stack key={i} spacing={0}>
          <Skeleton variant="rounded" width={"100%"} height={150}  />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </Stack>
      ))}
    </div>
  );
}
