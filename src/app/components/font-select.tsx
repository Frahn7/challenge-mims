import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export const FontSelect = () => {
  const handleChange = (value: string) => {
    const root = document.querySelector(":root") as HTMLElement | null;
    if (root) {
      root.style.setProperty("--font-family", value);
    }
  };

  return (
    <Select defaultValue="serif" onValueChange={handleChange}>
      <SelectTrigger className="w-[120px] cursor-pointer border-0 border-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="serif">Serif</SelectItem>
        <SelectItem value="sans-serif">Sans serif</SelectItem>
        <SelectItem value="monospace">Monospace</SelectItem>
      </SelectContent>
    </Select>
  );
};
