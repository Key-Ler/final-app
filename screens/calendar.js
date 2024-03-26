import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
// for the pop upppppp
import Modal from 'react-native-modal';
// library for agenda importation
import { Calendar, Agenda } from 'react-native-calendars';

const AgendaScreen = () => {
  const [items, setItems] = useState({});
  const [inputName, setInputName] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [selectedDate, setSelectedDay] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  // generated items
  const Datedata = {
    '2024-03-19': [{ id: '1', name: 'Event 1', time: '10:00 AM' }, { id: '2', name: 'Event 2', time: '2:00 PM' }],
    '2024-03-20': [{ id: '3', name: 'Event 3', time: '11:30 AM' }, { id: '4', name: 'Event 4', time: '3:30 PM' }],
    '2024-03-21': [{ id: '5', name: 'Event 5', time: '8:45 AM' }, { id: '6', name: 'Event 6', time: '9:15 PM' }],
  };

  // function to handle adding a new item
  const handleAddItem = () => {
    if (inputName && inputTime) {
      const newItem = { id: Date.now().toString(), name: inputName, time: inputTime }; 
      setItems((prevItems) => ({
        ...prevItems,
        [selectedDate]: [...(prevItems[selectedDate] || []), newItem],
      }));
      setInputName('');
      setInputTime('');
      toggleModal();
    }
  };
  // function to handle editing selected item
  const handleEditItem = () => {
    if (inputName && inputTime) {
      const updatedItems = { ...items };
      if (updatedItems[selectedDate]) { 
        updatedItems[selectedDate] = updatedItems[selectedDate].map(item =>
          item.id === selectedItem.id ? { ...item, name: inputName, time: inputTime } : item
        );
        setItems(updatedItems);
        setInputName('');
        setInputTime('');
        toggleModal();
        setSelectedItem(null);
      }
    }
  };
  // function to delete selected function
  const handleDeleteItem = () => {
      const updatedItems = { ...items };
      if (updatedItems[selectedDate]) { 
        updatedItems[selectedDate] = updatedItems[selectedDate].filter(item => item.id !== selectedItem.id);
        setItems(updatedItems);
        toggleModal();
        setSelectedItem(null);
      }
  };
  // function that hadles when modal to apper in view
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        // function that gets called when items
        loadItemsForMonth={(month) => {
          setItems(Datedata);// Set date date for item then display int the view
        }}
        renderItem={(item) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text>{item.name}</Text>
              <Text>{item.time}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => { toggleModal(); setSelectedItem(item); }} />
              <Button title="Delete" onPress={() => { toggleModal(); setSelectedItem(item); }} />
            </View>
          </View>
        )}
        onDayPress={(day) => {
          toggleModal();
          setSelectedDay(day.dateString)
        }}
        style={{ width: '90%' }}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedItem ? 'Edit Item' : 'Add Item'}</Text>
          <TextInput
            style={styles.input}
            value={inputName}
            onChangeText={(val => setInputName(val))}
            placeholder="Enter event name"
          />
          <TextInput
            style={styles.input}
            value={inputTime}
            onChangeText={(val => setInputTime(val))}
            placeholder="Enter event time"
          />
          {selectedItem ? (
            <>
              <Button title="Edit Item" onPress={handleEditItem} />
              <Button title="Delete Item" onPress={handleDeleteItem} />
            </>
          ) : (
            <Button title="Add Item" onPress={handleAddItem} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});

export default AgendaScreen;
