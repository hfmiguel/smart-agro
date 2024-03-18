import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const ResultadoScreen = ({ route }) => {
  const { result } = route.params;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Tipos de Solo
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {result != null ? (
          result.map((item, index) => (
            <Card key={index} style={{ width: "48%", marginBottom: 20 }}>
              <Card.Content>
                <Title>ID: {item.ID_PONTO}</Title>
                <Paragraph>Ordem: {item.ORDEM}</Paragraph>
                <Paragraph>Subordem: {item.SUBORDEM}</Paragraph>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text>Nenhum resultado encontrado</Text>
        )}
      </View>
    </View>
  );
};

export default ResultadoScreen;
