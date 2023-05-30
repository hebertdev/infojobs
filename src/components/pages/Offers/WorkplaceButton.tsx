import { useState } from "react";

//hooks
import { useFormSearch } from "@/hooks/useFormSearch";

//mantine
import { Menu, Button, Radio, Box } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function WorkplaceButton() {
  const { handleSetUrlParams, handleSubmitSearch } = useFormSearch();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const handleSetValueRadio = (value: string) => {
    setValue(value);
    const selectedOption = options.find((option) => option.key === value);
    if (selectedOption) {
      setName(selectedOption.value);
    }
    if (value === "") {
      setName("");
    }
    handleSetUrlParams("teleworking", value);
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
            Modalidad
            <>
              {name.length >= 0 && (
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
        <Menu.Label>Modalidad de trabajo</Menu.Label>
        <Radio.Group
          value={value}
          onChange={(value: string) => handleSetValueRadio(value)}
          name="favoriteFramework"
        >
          {options.map((option, index) => (
            <Radio
              key={index}
              value={option.key}
              label={option.value}
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

const options = [
  {
    id: 0,
    value: "(Sin filtro)",
    order: 0,
    key: "",
  },
  {
    id: 1,
    value: "Presencial",
    order: 1,
    key: "trabajo-solo-presencial",
  },
  {
    id: 2,
    value: "Solo teletrabajo",
    order: 2,
    key: "solo-teletrabajo",
  },
  {
    id: 3,
    value: "Híbrido",
    order: 3,
    key: "teletrabajo-posible",
  },
  {
    id: 4,
    value: "Sin especificar",
    order: 4,
    key: "no-se-sabe-no-esta-decidido",
  },
];
