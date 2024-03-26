import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// importing the firebase
import {db, logUserProgress, retriveLogExerciseProgress, retriveLogProgress, dataExec} from '../Database/firebase';

// importing the dropdown
import {Dropdown} from 'react-native-element-dropdown';
// importing modal
import Modal from 'react-native-modal';
// import chart-kit
import { LineChart } from 'react-native-chart-kit';

const TrackScreen = () => {
    const [inputWeight, setInputWeight] = useState('');
    const [inputReps, setInputReps] = useState('');
    const [inputExercise, setInputExercise] = useState('');
    const [exerciseName, setExerciseName] = useState('');
    const [selectedExercise, setSelectedExercise] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [logProgressData, setLogProgressData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
      // Fetch log progress data when component mounts
      const fetchData = async () => {
        try {
          const data = await retriveLogProgress();
          setLogProgressData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    const handleExerciseChange = async (exerciseName) => {
      try {
        const data = await retriveLogExerciseProgress(exerciseName);
        setSelectedExercise(data);
        console.log(exerciseName);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const logTheProcess = () => {
      if (!inputReps) {
        alert("Please enter the number of reps");
        return;
      }
      if (!inputWeight) {
        alert("Please enter the weight");
        return;
      }
      if (!inputExercise) {
        alert("Please enter the exercise");
        return;
      }
      // calling function from firebase database
      logUserProgress(inputExercise, inputWeight, inputReps);
      // setting variables back to their original state
      setInputExercise('');
      setInputReps('');
      setInputWeight('');
      setModalVisible(false);
    }

    const handleModalOpen = () => {
      setModalVisible(true);
    };
    const handleModalClose = () => {
      setModalVisible(false);
    };

  return (
    <ScrollView>
      
    <View style={styles.container2}>
      <Dropdown
          style={[styles.inputBox, isFocus && { color: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={dataExec}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!exerciseName ? 'Select item' : exerciseName}
            searchPlaceholder="Search..."
            value={exerciseName}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setExerciseName(item.label)
              handleExerciseChange(item.label);
              setIsFocus(false);
            }}
        />
      <Text style={styles.text}>Records</Text>
      {selectedExercise.length === 0 ? (
          logProgressData.map((item) => (
            <View key={item.id} style={styles.logItem}>
              <Text>Exercise Name: {item.ExerciseName}</Text>
              <Text>Weight: {item.WeightPerform}</Text>
              <Text>Number of Reps: {item.NumberOfReps}</Text>
              <Text>Date: {item.Date.toDate().toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          selectedExercise.map((item) => (
            <View key={item.id} style={styles.logItem}>
              <Text>Exercise Name: {item.ExerciseName}</Text>
              <Text>Weight: {item.WeightPerform}</Text>
              <Text>Number of Reps: {item.NumberOfReps}</Text>
              <Text>Date: {item.Date.toDate().toLocaleDateString()}</Text>
            </View>
          ))
        )}
      <TouchableOpacity style={styles.button} onPress={(handleModalOpen)}>
          <Text style={styles.text}>Log Progress</Text>
      </TouchableOpacity>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <View style={styles.containerSmall}>
        <Text>Enter Exercise:</Text>
        <Dropdown
          style={[styles.inputBox, isFocus && { color: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={dataExec}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!inputExercise ? 'Select item' : inputExercise}
            searchPlaceholder="Search..."
            value={inputExercise}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setInputExercise(item.label);
              setIsFocus(false);
            }}
        />

        <Text>Enter Weight:</Text>
        <TextInput 
          keyboardType='numeric'
          style={styles.inputBox} 
          placeholder='70kg' 
          value={inputWeight}
          onChangeText={(val) => setInputWeight(val)}/>

        <Text>Enter Repetitions:</Text>
        <TextInput 
          keyboardType='numeric'
          style={styles.inputBox}
          placeholder='12'
          value={inputReps}
          onChangeText={(val => setInputReps(val))}/>

        <TouchableOpacity style={styles.button} onPress={(logTheProcess)}>
          <Text style={styles.text}> Log progress</Text>
        </TouchableOpacity>
        </View>

      </Modal>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#EBF3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSmall: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
  },
  inputBox:{
    borderWidth: 1,
    borderColor: '#100c08',
    borderRadius: 5,
    padding: 8,
    margin: 10,
    width: 200,
  },
  button: {
    backgroundColor: '#4CAF50', // Set your desired background color
    color: 'white',             // Set your desired text color
    padding: '10px 20px',       // Set padding
    borderRadius: '5px',        // Set border radius
    cursor: 'pointer',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  dropdown:{
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 100,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  logItem: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    width: 300,
  },
  placeholderStyle:{
    fontSize: 16,
  },
  selectedTextStyle:{
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
});

export default TrackScreen;
