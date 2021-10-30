import React, {useState} from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';

const App = () => {

  const [form, setForm] = useState(false); 

  //Definir el state de citas
  const [citas, setCitas] = useState([
    {
      id: "", 
      paciente: "",
      propietario: "",
      sintomas: ""
    },
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id);
    })
  }

  //Muestra u oculta el formulario
  const showForm = () => {
    setForm(!form);
  }

  //Ocultar teclado
  const closeKeyBoard = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyBoard()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>
          <TouchableHighlight onPress={() => showForm()} style={styles.btnForm}>
              <Text style={styles.textoForm}>{form ? 'Regresar al listado de citas' : 'Crear una nueva cita'}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {form ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario 
                citas={citas}
                setCitas={setCitas}
                setForm={setForm}
              />
            </>
          ): (
            <>
              <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
              <FlatList 
                style={styles.listado}
                data={citas}
                renderItem={({item}) =>  <Cita cita={item} eliminarPaciente={eliminarPaciente} /> }
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

//Nuestros Estilos
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20 ,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1,
  },
  btnForm: {
    padding: 10,
    backgroundColor: '#7D024E',
    marginVertical: 2
  },
  textoForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default App;
