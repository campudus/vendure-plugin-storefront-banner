import { Switch } from "@vendure/dashboard";

import "./ToggleSwitch.scss";

type ToggleSwitchProps = {
  active: boolean;
  onToggle: (value: boolean) => void;
};

export function ToggleSwitch({ active, onToggle }: ToggleSwitchProps) {
  return <Switch checked={active} onCheckedChange={onToggle} />;
}

