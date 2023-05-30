import { Menu, Button } from "@mantine/core";
import {
  IconSettings,
  IconMessageCircle,
  IconChevronDown,
} from "@tabler/icons-react";

export function SortButton() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="default"
          radius="xl"
          rightIcon={<IconChevronDown size={"13px"} />}
        >
          Ordenar
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Ordenar Ofertas</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>
          Fecha de publicación
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Relevancia</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
