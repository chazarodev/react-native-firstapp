import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setForm}) => {

    const [owner, setOwner] = useState('');
    const [patient, setPatient] = useState('');
    const [symptom, setSymptom] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [phone, setPhone] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        const options = {year: 'numeric', month: 'long', day: '2-digit'}
        setDate(date.toLocaleDateString('es-ES', options));
        hideDatePicker();
    };

    //Muestra u oculta el time peaker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = (time) => {
        const options = {hour: 'numeric', minute: '2-digit', hour12: false}
        setTime(time.toLocaleTimeString('es-ES', options));
        hideTimePicker();
    };

    //create a new apointment
    const newApointment = () => {
        if (owner.trim() === '' || patient.trim() === '' || symptom.trim() === '' || date.trim() === '' || time.trim() === '' || phone.trim() === '') {
            console.log('ALgún campo no tien información');
            showAlert();
            return;
        }
        //Crear nueva cita
        const apointment = {owner, patient, symptom, date, time, phone};
        apointment.id = shortid.generate();
        //Agregar al state
        const newApointment = [...citas, apointment];
        setCitas(newApointment);
        //Ocultar y resetaer formulario
        setForm(false);
        
    }

    //Muestra alerta si la validación falla
    const showAlert = () => {
        Alert.alert(
            'Error', //Título
            'Todos los campos son obligatoris', //Mensaje
            [{text: 'Ok'}] //Arreglo de botones
        )
    }

    return (  
        <ScrollView>
            <View style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(texto) => setOwner(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(texto) => setPatient(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Síntomas:</Text>
                    <TextInput
                        multiline 
                        style={styles.input}
                        onChangeText={(texto) => setSymptom(texto)}
                    />
                </View>
                <View style={styles.btn}>
                    <Text style={styles.label}>Fecha: </Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                    />
                    <Text>{date}</Text>
                </View>
                <View style={styles.btn}>
                    <Text style={styles.label}>Hora: </Text>
                    <Button title="Confirmar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                    />
                    <Text>{time}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Teléfono Contacto:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(texto) => setPhone(texto)}
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <TouchableHighlight onPress={() => newApointment()} style={styles.btnAdd}>
                        <Text style={styles.textoAdd}>Agregar Cita</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%',
        borderRadius: 2
    },
    label: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#E1E1E1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btn: {
        marginVertical: 5
    },
    btnAdd: {
        padding: 10,
        backgroundColor: '#7D024E',
        marginVertical: 10
    },
    textoAdd: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
 
export default Formulario;