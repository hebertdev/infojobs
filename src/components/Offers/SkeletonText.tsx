import { Skeleton, Box } from "@mantine/core";

export function SkeletonText() {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Skeleton height={8} radius="xl" width="80%" />
      <Skeleton height={8} mt={6} radius="xl" width="90%" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" width="80%" />
      <Skeleton height={8} mt={6} radius="xl" width="90%" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </Box>
  );
}
