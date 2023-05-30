import { useState } from "react";

//hooks
import { useFormSearch } from "@/hooks/useFormSearch";

//mantine
import { Menu, Button, Checkbox, Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function WorkdayButton() {
  const { handleSetUrlParams, handleSubmitSearch } = useFormSearch();
  const [opened, setOpened] = useState(false);
  const [values, setValues] = useState<string[]>();

  const handleOnChangeCheckbox = (value: string[]) => {
    setValues(value);
    handleSetUrlParams("workday", value.join(","));
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
          Jornada
        </Button>
      </Menu.Target>

      <Menu.Dropdown sx={{ userSelect: "none" }}>
        <Menu.Label>Jornada Laboral</Menu.Label>

        <Checkbox.Group
          value={values}
          withAsterisk
          onChange={(value) => handleOnChangeCheckbox(value)}
        >
          <Group mt="xs">
            {workdays.map((workday, index) => (
              <Checkbox
                key={index}
                value={workday.key}
                label={workday.value}
                sx={{
                  padding: "10px",
                }}
              />
            ))}
          </Group>
        </Checkbox.Group>
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

const workdays = [
  {
    id: 10,
    value: "Indiferente",
    order: 3,
    key: "indiferente",
  },
  {
    id: 1,
    value: "Completa",
    order: 2,
    key: "completa",
  },
  {
    id: 2,
    value: "Parcial - Mañana",
    order: 4,
    key: "parcial-manana",
  },
  {
    id: 3,
    value: "Parcial - Tarde",
    order: 5,
    key: "parcial-tarde",
  },
  {
    id: 4,
    value: "Parcial - Noche",
    order: 6,
    key: "parcial-noche",
  },
  {
    id: 5,
    value: "Parcial - Indiferente",
    order: 7,
    key: "parcial-indiferente",
  },
  {
    id: 6,
    value: "Intensiva - Mañana",
    order: 8,
    key: "intensiva-manana",
  },
  {
    id: 7,
    value: "Intensiva - Tarde",
    order: 9,
    key: "intensiva-tarde",
  },
  {
    id: 8,
    value: "Intensiva - Noche",
    order: 10,
    key: "intensiva-noche",
  },
  {
    id: 9,
    value: "Intensiva - Indiferente",
    order: 11,
    key: "intensiva-indiferente",
  },
];
