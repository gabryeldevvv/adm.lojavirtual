import { useEffect, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import FormControl, { type FormControlProps } from "@mui/joy/FormControl";
import axios from "axios";

interface CategoriaType {
  id: string;
  nome: string;
}

type SeletorRegistroProps = {
  onSelect: (categoriaId: string | null) => void;
  defaultValue?: CategoriaType | null;
} & Omit<FormControlProps, "onSelect">;

export default function SeletorRegistro({
  onSelect,
  defaultValue,
  sx,
  ...other
}: SeletorRegistroProps) {
  const [options, setOptions] = useState<CategoriaType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<CategoriaType | null>(defaultValue ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue) return;

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      axios
        .get(
          `https://webservice-pw0xla.fly.dev/api/categorias?search=${inputValue}`,
          {
            auth: { username: "admin", password: "admin123" },
          }
        )
        .then((res) => setOptions(res.data))
        .catch((err) => console.error("Erro ao buscar categorias:", err))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  return (
    <FormControl
      {...other}
      sx={[{ display: { sm: "contents" } }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Autocomplete
        size="sm"
        autoHighlight
        loading={loading}
        options={options}
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          onSelect(newValue ? newValue.id : null);
        }}
        getOptionLabel={(option) => option.nome}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onInputChange={(_, value) => setInputValue(value)}
        renderOption={(optionProps, option) => (
          <AutocompleteOption {...optionProps}>{option.nome}</AutocompleteOption>
        )}
        slotProps={{
          input: {
            autoComplete: "new-password",
          },
        }}
      />
    </FormControl>
  );
}
