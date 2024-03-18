// ClassificacaoScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import apiService from "../Services/apiService";
import originalInputs from "../Services/classification";

const ClassificacaoScreen = ({ navigation }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [formData, setFormData] = useState({ items: originalInputs });
  const [loading, setLoading] = useState(false); // Estado para

  const onSubmit = async () => {
    try {
      setLoading(true);

      var items = {};
      Object.keys(formData.items).map(function (key, item) {
        if (key !== "HORIZONTES") {
          items[key] = formData.items[key].value;
          if (typeof formData.items[key].type != undefined) {
            if (formData.items[key].type === "integer") {
              items[key] = parseInt(items[key]);
            } else if (formData.items[key].type === "float") {
              items[key] = parseFloat(items[key]);
            }
          }
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

      apiService
        .post("/classification", {
          items: items,
        })
        .then((response) => {
          setLoading(false);
          return response;
        })
        .then((response) => {
          navigation.navigate("Resultado", { result: response.data.items });
        })
        .catch((error) => {
          console.error("Erro na solicitação:", error);
          setLoading(false);
        });
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
    const input = formData.items[index];

    return (
      <View key={index}>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              label={input.label}
              name={index}
              value={formData.items[index].value}
              className="!bg-white border border-gray-300 rounded-lg p-2 hover:border-gray-400 gap-2 flex"
              onChangeText={function (text) {
                setValue(index, text);
                setFormData((prevState) => ({
                  ...prevState,
                  items: {
                    ...prevState.items,
                    [index]: {
                      ...prevState.items[index],
                      value: text,
                    },
                  },
                }));
              }}
            />
          )}
          name={`items[0].${item}`}
          defaultValue=""
        />
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 bg-gray-100 w-3/4 h-full m-auto justify-center">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Indicador de carregamento
      ) : (
        <>
          <View className="grid grid-cols-4 gap-6">{renderFormFields()}</View>

          <View className="flex flex-row gap-4 justify-center mt-6">
            <Button title="Adicionar Horizonte" color="orange" />

            <Button
              title="Enviar"
              onPress={handleSubmit(onSubmit)}
              color="green"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ClassificacaoScreen;
