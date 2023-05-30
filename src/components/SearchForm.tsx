import React from "react";

//hooks
import { useFormSearch } from "@/hooks/useFormSearch";

//mantine
import { Button, Box, Paper, Input, Autocomplete } from "@mantine/core";

//icons
import { IconSearch, IconMapPin, IconBriefcase } from "@tabler/icons-react";

export function SearchForm() {
  const {
    handleOnChangeSelect,
    handleSubmitSearch,
    handleSetUrlParams,
    provinces,
    urlParams,
  } = useFormSearch();

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        margin: "10px 0",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
          gap: "5px",
        }}
        component="form"
        onSubmit={handleSubmitSearch}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "5px",
          }}
        >
          <Input
            icon={<IconBriefcase />}
            sx={{
              width: "100%",
              flex: 5,
            }}
            placeholder="Cargo o categoría"
            onChange={(e) => handleSetUrlParams("q", e.target.value)}
            value={urlParams.q}
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                if (e.target.value === "") return;
                handleSubmitSearch();
              }
            }}
          />
          <Autocomplete
            sx={{ flex: 3 }}
            icon={<IconMapPin />}
            placeholder="Lugar"
            data={provinces?.slice(1).map((item: any) => item.value) || []}
            onChange={handleOnChangeSelect}
            value={urlParams.province}
          />
        </Box>
        <Button leftIcon={<IconSearch />} onClick={handleSubmitSearch}>
          Buscar empleos
        </Button>
      </Box>
    </Paper>
  );
}
