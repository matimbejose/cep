import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Keyboard } from 'react-native';
import api from './src/services/api';



export default function App() {
  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = useState(null)

  function limpar() {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }

  async function buscar() {
    if (cep == '') {
      alert("Digite um cep valido!")
      setCep('')
      return
    }


    try {
      const response = await api.get(`/${cep}/json`)
      Keyboard.dismiss()
      setCepUser(response.data)

    } catch (error) {
      console.log('Erro' + error)
    }


  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex 7383984"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType='numeric'
          ref={inputRef}
        />

      </View>


      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.botoa}>
          <Text onPress={buscar} style={styles.botoaText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botoa, { backgroundColor: '#cd3e1d' }]}>
          <Text
            style={styles.botoaText}
            onPress={limpar}
          >
            Limpar
          </Text>
        </TouchableOpacity>
      </View>

      {cepUser &&

        <View style={styles.resultado}>
          <Text styles={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text styles={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text styles={styles.itemText}>Biarro: {cepUser.bairro}</Text>
          <Text styles={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text styles={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botoa: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#1d75cd'
  },
  botoaText: {
    fontSize: 22,
    color: '#FFF'
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 50
  }



});
