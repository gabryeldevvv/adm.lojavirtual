// src/pages/RegistroCor.tsx
import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCorById, useCreateCor, useUpdateCor } from "../hooks/useCores";

type CorFormData = {
  nome: string;
  codigoHex?: string;
};

export default function RegistroCor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const { register, handleSubmit, reset } = useForm<CorFormData>();

  const { data: cor, isLoading } = useCorById(id ?? "");
  const { mutateAsync: criar } = useCreateCor();
  const { mutateAsync: atualizar } = useUpdateCor();

  useEffect(() => {
    if (cor) {
      reset({
        nome: cor.nome,
        codigoHex: cor.codigoHex ?? "",
      });
    }
  }, [cor, reset]);

  const onSubmit = async (dados: CorFormData) => {
    if (isEdit && id) {
      await atualizar({ id, data: dados });
    } else {
      await criar(dados);
    }
    navigate("/cores");
  };

  if (isEdit && isLoading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography level="h4">{isEdit ? "Editar Cor" : "Nova Cor"}</Typography>

      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input {...register("nome", { required: true })} />
      </FormControl>

      <FormControl>
        <FormLabel>Código Hex</FormLabel>
        <Input {...register("codigoHex")} />
      </FormControl>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit">{isEdit ? "Salvar" : "Criar"}</Button>
        <Button variant="outlined" color="neutral" onClick={() => navigate("/cores")}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
