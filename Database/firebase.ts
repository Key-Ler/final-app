// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {doc, setDoc, query, collection, where, 
        addDoc, getFirestore, getDoc, Timestamp, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxGLcssgjj9FCU0BOiNtxRmMDv3zl-BOo",
  authDomain: "fir-app-d6cdd.firebaseapp.com",
  projectId: "fir-app-d6cdd",
  storageBucket: "fir-app-d6cdd.appspot.com",
  messagingSenderId: "139590745572",
  appId: "1:139590745572:web:54650bcca0dbbd3f621bf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// query to save content to firestore
const logUserProgress = async (name, weight, reps) =>{
    try {
        await addDoc(collection(db,'LogProcess'),{
            ExerciseName: name,
            WeightPerform: weight,
            NumberOfReps: reps,
            Date: Timestamp.fromDate(new Date()),
        });
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
}

// query to extract all the data from logProgress
const retriveLogProgress = async () =>
{
    try {
        const retriveData = await getDocs(collection(db,'LogProcess'));
        const retriveProgressArray = [];
        // looping through collection Logprogress
        // and pushing the data to retriveProgressArray
        retriveData.forEach((doc) => {
            retriveProgressArray.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return retriveProgressArray;
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
}

// retrive inserte input for exercise
const retriveLogExerciseProgress = async (name) =>
{
    try {
        const q = query(collection(db,'LogProcess'), where('ExerciseName', '==', name));
        const retriveData = await getDocs(q);
        const retriveExerciseArray = [];
        // looping through collection Logprogress
        // and pushing the data to retriveProgressArray
        retriveData.forEach((doc) => {
            retriveExerciseArray.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return retriveExerciseArray;
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
}

//// data for the exercises availible ////

// creating doc for exercise list
const exercList = collection(db, 'Exercise_List');
const dataExec = [
    {label: 'Barbell Squad', value: 1},
    {label: 'Barbell Bench', value: 2},
    {label: 'Barbell Row', value: 3},
    {label: 'Barbell Shoulder press', value: 4},
    {label: 'Deadlift', value: 5},
    {label: 'Pull ups', value:6},];
// adding the exercise array to the doc
const data = async () => {
    try {
        await setDoc(doc(db, 'Exercise_List'), {
        ExerciseList: [dataExec],
        });
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
}

export {db, data, logUserProgress, retriveLogExerciseProgress, retriveLogProgress, exercList, dataExec};