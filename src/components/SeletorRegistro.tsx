import { useEffect, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import FormControl, { type FormControlProps } from "@mui/joy/FormControl";
import axios from "axios";

interface ItemBasico {
  id: string;
  nome: string;
}

type SeletorRegistroProps<T extends ItemBasico> = {
  objeto: string;
  onSelect: (item: T | null) => void;
  value?: T | null;
} & Omit<FormControlProps, "onSelect">;

export default function SeletorRegistro<T extends ItemBasico>({
  objeto,
  onSelect,
  value,
  sx,
  ...other
}: SeletorRegistroProps<T>) {
  const [options, setOptions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [internalValue, setInternalValue] = useState<T | null>(null);

  // Sincroniza o valor interno quando a prop value muda
  useEffect(() => {
    setInternalValue(value || null);
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://webservice-pw0xla.fly.dev/api/${objeto}?search=${inputValue}`,
          {
            auth: { username: "admin", password: "admin123" },
          }
        );
        setOptions(response.data);
      } catch (err) {
        console.error("Erro ao buscar registros:", err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchData, 300);
    return () => clearTimeout(delayDebounce);
  }, [inputValue, objeto]);

  const handleChange = (_: any, newValue: T | null) => {
    setInternalValue(newValue);
    onSelect(newValue);
  };

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
        value={internalValue}
        inputValue={inputValue}
        onChange={handleChange}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.nome}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        renderOption={(optionProps, option) => (
          <AutocompleteOption {...optionProps}>{option.nome}</AutocompleteOption>
        )}
        slotProps={{
          input: {
            autoComplete: "new-password",
          },
        }}
        filterOptions={(options) => options}
      />
    </FormControl>
  );
}