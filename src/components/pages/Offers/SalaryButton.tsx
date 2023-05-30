import { useState } from "react";

//hooks
import { useFormSearch } from "@/hooks/useFormSearch";

//mantine
import { Menu, Button, Box, Radio, Slider } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function SalaryButton() {
  const { handleSetUrlParams, handleSubmitSearch } = useFormSearch();
  const [opened, setOpened] = useState(false);
  const [valueSlider, setValueSlider] = useState<number>(3);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const handleOnChangeSlider = (value: number) => {
    setValueSlider(value);
    handleSetUrlParams("salaryMin", value * 1000);
  };

  const handleSetValueRadio = (value: string) => {
    setValue(value);
    const selectedOption = periods.find((period) => period.key === value);
    if (selectedOption) {
      setName(selectedOption.value);
    }
    if (value === "") {
      setName("");
    }
    handleSetUrlParams("salaryPeriod", value);
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
            Salario
            <>
              {name.length > 0 && (
                <>
                  <br />
                  <small>{name}</small> - <small>{valueSlider}K</small>
                </>
              )}
            </>
          </Box>
        </Button>
      </Menu.Target>

      <Menu.Dropdown sx={{ userSelect: "none" }}>
        <Menu.Label>Rando de salario Anual | €</Menu.Label>
        <Radio.Group
          value={value}
          onChange={(value: string) => handleSetValueRadio(value)}
          name="favoriteFramework"
        >
          {periods.map((period, index) => (
            <Radio
              key={index}
              value={period.key}
              label={period.value}
              sx={{
                padding: "10px",
              }}
            />
          ))}
        </Radio.Group>

        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Slider
            value={valueSlider}
            onChange={(value) => handleOnChangeSlider(value)}
            min={1}
            max={150}
          />
          Minimo {valueSlider}k
        </Box>
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

const periods = [
  {
    id: 0,
    value: "(Sin filtro)",
    order: 0,
    key: "",
  },
  {
    id: 3,
    value: "Bruto/año",
    order: 10,
    key: "bruto-ano",
  },
  {
    id: 2,
    value: "Bruto/mes",
    order: 20,
    key: "bruto-mes",
  },
  {
    id: 1,
    value: "Bruto/hora",
    order: 30,
    key: "bruto-hora",
  },
];
