const fs = require('fs');

console.log('Math training');
// =================================
// Settings
const maxValue = 9999;
const minValue = 11;
const examplesRange = 100;
const fileName = './examples.txt';
// =================================

const exampleArr = [];
const operationArr = ['+','-'];

while(exampleArr.length < examplesRange){
    const operationIndex = getRandomArrayElementIndex(operationArr);
    const num1 = getRandomInt(minValue, maxValue);
    const num2 = getRandomInt(minValue, maxValue);
    const res = randomExample(num1, num2, operationArr[operationIndex]);
     if(!exampleArr.includes(res)){
         exampleArr.push(res);
     }
}
if(isFileExists(fileName)){
    deleteFile(fileName);
}

exampleArr.forEach((el, i) => {
    el = i+1+') \n'+el;
    console.log(el);
    writeTextToFile(el, i)
    //processInput(ex)
})

console.log(getDate());
writeTextToFile(getDate(), 0)


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElementIndex(arr) {
    if (arr.length === 0) {
        throw new Error('Array is empty');
    } else if (arr.length === 1) {
        return 0;
    } else {
        return getRandomInt(0, arr.length-1);
    }
}

function randomExample(num1, num2, operation){
    let example;
    if(operation === '+'){
        example = strFormatting((num1+num2),num2,operation);
        return example;    
    } else {
        if (num1>num2) {
            // example = num1 + '\n-' + num2;
            example = strFormatting(num1, num2, operation)
        }
        else {
            //example = num2 + '\n   -' + num1;
            example = strFormatting(num2, num1, operation)
        }
        return example;
    }
}

function strFormatting(str1, str2, operation){
    const str1Lenght = str1.toString().length;
    const str2Lenght = str2.toString().length;
    let diff = 0;
    let hiN;
    let lowN;
    let res = '';
    if(str1>str2) {
        diff=str1Lenght-str2Lenght;
        hiN = str1;
        lowN = str2
    } else {
        diff=str2Lenght-str1Lenght
        hiN = str2
        lowN = str1
    } 
    if(diff!=0){
        for (let i = 0; i < diff; i++) {
            lowN = ' '+lowN;
        }
        res = ' '+hiN+"\n"+operation +lowN+"\n\n"
        // console.log(res);
    } else {
        res = ' '+hiN+"\n"+operation +lowN+"\n\n"
    }
//    console.log('Lengt '+str1Lenght);
    return res;
}

function isFileExists(fileName){
    return fs.existsSync(fileName);
}

function deleteFile(fileName) {
    fs.unlinkSync(fileName);
}

function writeTextToFile(text, i){
    fs.appendFileSync(fileName, text.toString());
}

function getDate(){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const currDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return currDate;
}
