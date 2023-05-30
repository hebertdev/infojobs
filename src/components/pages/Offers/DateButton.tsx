import { useState } from "react";

//hooks
import { useFormSearch } from "@/hooks/useFormSearch";

//mantine
import { Menu, Button, Radio, Box } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function DateButton() {
  const { handleSetUrlParams, handleSubmitSearch } = useFormSearch();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const handleSetValueRadio = (value: string) => {
    setValue(value);
    const selectedOption = dates.find((date) => date.key === value);
    if (selectedOption) {
      setName(selectedOption.name);
    }
    if (value === "") {
      setName("");
    }
    handleSetUrlParams("sinceDate", value);
  };

  const handleCloseMenu = () => {
    handleSubmitSearch();
    setOpened(false);
  };

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <Button
          variant="default"
          radius="xl"
          rightIcon={<IconChevronDown size={"13px"} />}
        >
          <Box>
            Fecha
            <>
              {name.length > 0 && (
                <>
                  <br />
                  <small>{name}</small>
                </>
              )}
            </>
          </Box>
        </Button>
      </Menu.Target>

      <Menu.Dropdown sx={{ userSelect: "none" }}>
        <Menu.Label>Fecha de publicación</Menu.Label>

        <Radio.Group
          value={value}
          onChange={(value: string) => handleSetValueRadio(value)}
          name="favoriteFramework"
        >
          {dates.map((date, index) => (
            <Radio
              key={index}
              value={date.key}
              label={date.name}
              sx={{
                padding: "10px",
              }}
            />
          ))}
        </Radio.Group>
        <Button
          variant="outline"
          fullWidth
          size="xs"
          sx={{
            marginTop: "10px",
          }}
          onClick={handleCloseMenu}
        >
          Aplicar
        </Button>
      </Menu.Dropdown>
    </Menu>
  );
}

const dates = [
  {
    name: "(Sin filtro)",
    key: "",
  },
  {
    name: "Cualquier fecha",
    key: "ANY",
  },
  {
    name: "Últimas 24 horas",
    key: "_24_HOURS",
  },
  {
    name: "Últimos 7 días",
    key: "_7_DAYS",
  },
  {
    name: "Últimos 15 días",
    key: "_15_DAYS",
  },
];
