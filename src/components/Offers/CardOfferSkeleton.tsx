import { Skeleton, Box } from "@mantine/core";

export function CardOfferSkeleton() {
  return (
    <>
      <Box
        sx={{
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "170px",
          borderBottom: "0.0625rem solid #dee2e6",
        }}
      >
        <Box sx={{ flex: 5, padding: "10px" }}>
          <Skeleton height={15} radius="xl" />
          <Skeleton height={8} mt={6} width="30%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="50%" radius="xl" />
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton circle height={55} />
        </Box>
      </Box>
    </>
  );
}
