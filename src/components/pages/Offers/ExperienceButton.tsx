import { useState } from "react";

//hooks
import { useFormSearch } from "@/hooks/useFormSearch";

//mantine
import { Menu, Button, Radio, Box } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function ExperiencieButton() {
  const { handleSetUrlParams, handleSubmitSearch } = useFormSearch();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const handleSetValueRadio = (value: string) => {
    setValue(value);
    const selectedOption = experiences.find(
      (experience) => experience.key === value
    );
    if (selectedOption) {
      setName(selectedOption.value);
    }

    if (value === "") {
      setName("");
    }

    handleSetUrlParams("experienceMin", value);
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
            Experiencia
            <>
              {name.length > 0 && (
                <>
                  <br />
                  <small>
                    {name.length > 12 ? (
                      <> {name.slice(0, 12) + "..."} </>
                    ) : (
                      name
                    )}
                  </small>
                </>
              )}
            </>
          </Box>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Experiencia mínima</Menu.Label>
        <Radio.Group
          value={value}
          onChange={(value: string) => handleSetValueRadio(value)}
          name="favoriteFramework"
        >
          {experiences.map((experience, index) => (
            <Radio
              key={index}
              value={experience.key}
              label={experience.value}
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

const experiences = [
  {
    id: 0,
    value: "(Sin filtro)",
    order: 0,
    key: "",
  },
  {
    id: 1,
    value: "No Requerida",
    order: 2,
    key: "no-requerida",
  },
  {
    id: 2,
    value: "Al menos 1 año",
    order: 3,
    key: "al-menos-1-ano",
  },
  {
    id: 6,
    value: "Al menos 2 años",
    order: 4,
    key: "al-menos-2-anos",
  },
  {
    id: 3,
    value: "Al menos 3 años",
    order: 5,
    key: "al-menos-3-anos",
  },
  {
    id: 4,
    value: "Al menos 4 años",
    order: 6,
    key: "al-menos-4-anos",
  },
  {
    id: 5,
    value: "Más de 5 años",
    order: 7,
    key: "mas-de-5-anos",
  },
  {
    id: 8,
    value: "Más de 10 años",
    order: 8,
    key: "mas-de-10-anos",
  },
];
