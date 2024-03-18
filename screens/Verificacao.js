// ClassificacaoScreen.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import apiService from "../Services/apiService";

const originalInputs = {
  ID_PONTO: {
    value: "string",
    label: "ID do Ponto",
  },
  DRENAGEM: {
    value: 0,
    label: "Drenagem",
  },
  ORDEM: {
    value: "string",
    label: "Ordem",
  },
  SUBORDEM: {
    value: "string",
    label: "Subordem",
  },
  GDE_GRUPO: {
    value: "string",
    label: "Grande Grupo",
  },
  SUBGRUPO: {
    value: "string",
    label: "Subgrupo",
  },
  HORIZONTES: [
    {
      SIMB_HORIZ: {
        value: "string",
        label: "Símbolo do Horizonte",
      },
      LIMITE_SUP: {
        value: 0,
        label: "Limite Superior",
      },
      LIMITE_INF: {
        value: 0,
        label: "Limite Inferior",
      },
      ESPESSURA: {
        value: 0,
        label: "Espessura",
      },
      COR_UMIDA_MATIZ: {
        value: "string",
        label: "Cor Úmida Matiz",
      },
      COR_UMIDA_VALOR: {
        value: 0,
        label: "Cor Úmida Valor",
      },
      COR_UMIDA_CROMA: {
        value: 0,
        label: "Cor Úmida Croma",
      },
      COR_SECA_MATIZ: {
        value: "string",
        label: "Cor Seca Matiz",
      },
      COR_SECA_VALOR: {
        value: 0,
        label: "Cor Seca Valor",
      },
      COR_SECA_CROMA: {
        value: 0,
        label: "Cor Seca Croma",
      },
      COR_MOSQ_MATIZ_1: {
        value: "string",
        label: "Cor do Mosquito Matiz",
      },
      COR_MOSQ_VALOR_1: {
        value: 0,
        label: "Cor do Mosquito Valor",
      },
      COR_MOSQ_CROMA_1: {
        value: 0,
        label: "Cor do Mosquito Croma",
      },
      COR_MOSQ_MATIZ_2: {
        value: "string",
        label: "Cor do Mosquito Matiz",
      },
      COR_MOSQ_VALOR_2: {
        value: 0,
        label: "Cor do Mosquito Valor",
      },
      COR_UMIDA_AMASSADA_MATIZ: {
        value: "string",
        label: "Cor Úmida Amassada Matiz",
      },
    },
  ],
};

const Verificacao = ({ navigation }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [formData, setFormData] = useState({ items: originalInputs });

  const onSubmit = async (data) => {
    try {
      // only value
      var items = {};
      Object.keys(formData.items).map(function (key, item) {
        if (key !== "HORIZONTES") {
          items[key] = formData.items[key].value;
        } else {
          items[key] = [];
          formData.items[key].map(function (horizonte, index) {
            items[key][index] = {};
            Object.keys(horizonte).map(function (hrKey, item) {
              items[key][index][hrKey] = horizonte[hrKey].value;
            });
          });
        }
      });

      items = [items];

      const response = await apiService.post("/classification", {
        items: items,
      });

      navigation.navigate('Resultado', { result: response.data.items });
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  const renderFormFields = () =>
    Object.keys(formData.items).map(renderFormField);

  const renderFormField = (index, item) => {
    if (index === "HORIZONTES") {
      return;
    }
    const formInput = formData.items[index];

    return (
      <View key={index}>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              label={formInput.label}
              value={formInput.value}
              name={index}
              onChangeText={(text) => setValue(`items[0].${item}`, text)}
            />
          )}
          name={`items[0].${item}`}
          defaultValue=""
        />
      </View>
    );
  };

  return (
    <View>
      <View className="grid grid-cols-4 gap-6">{renderFormFields()}</View>

      <View className="flex flex-row gap-4 justify-center mt-6 border border-gray">
        <Button title="Adicionar Horizonte" color="orange" />

        <Button title="Enviar" onPress={handleSubmit(onSubmit)} color="green" />
      </View>
    </View>
  );
};

export default Verificacao;
