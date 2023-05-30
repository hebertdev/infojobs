import { useState } from "react";

//hooks
import { useFormSearch } from "@/hooks/useFormSearch";

//matine
import { Menu, Button, Radio, Box } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function ContractButton() {
  const { handleSetUrlParams, handleSubmitSearch } = useFormSearch();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const handleSetValueRadio = (value: string) => {
    setValue(value);
    const selectedOption = contracts.find((contract) => contract.key === value);
    if (selectedOption) {
      setName(selectedOption.value);
    }
    if (value === "") {
      setName("");
    }
    handleSetUrlParams("contractType", value);
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
            Contrato
            <>
              {name.length > 0 && (
                <>
                  <br />
                  <small>
                    {name.length > 10 ? (
                      <> {name.slice(0, 10) + "..."} </>
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

      <Menu.Dropdown sx={{ userSelect: "none" }}>
        <Menu.Label>Jornada Laboral</Menu.Label>
        <Radio.Group
          value={value}
          onChange={(value: string) => handleSetValueRadio(value)}
          name="favoriteFramework"
        >
          {contracts.map((contract, index) => (
            <Radio
              key={index}
              value={contract.key}
              label={contract.value}
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

const contracts = [
  {
    id: 0,
    value: "(Sin filtro)",
    order: 0,
    key: "",
  },
  {
    id: 10,
    value: "Autónomo",
    order: 15,
    key: "autonomo",
  },
  {
    id: 8,
    value: "De duración determinada",
    order: 20,
    key: "de-duracion-determinada",
  },
  {
    id: 6,
    value: "De relevo",
    order: 30,
    key: "de-relevo",
  },
  {
    id: 9,
    value: "Fijo discontinuo",
    order: 40,
    key: "fijo-discontinuo",
  },
  {
    id: 3,
    value: "Formativo",
    order: 50,
    key: "formativo",
  },
  {
    id: 1,
    value: "Indefinido",
    order: 60,
    key: "indefinido",
  },
  {
    id: 4,
    value: "A tiempo parcial",
    order: 65,
    key: "a-tiempo-parcial",
  },
  {
    id: 5,
    value: "Otros contratos",
    order: 70,
    key: "otros-contratos",
  },
];
