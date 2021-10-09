const fs = require('fs');

console.log('Math training');
// =================================
// Settings
const maxValue = 9;
const minValue = 3;
const examplesRange = 80;
const fileName = './examples.txt';
// =================================

const exampleArr = [];
const operationArr = [':','*'];

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
    const ex = i+1+')  '+el;
    console.log(ex);
    writeTextToFile(ex, i)
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
    if(operation === ':'){
        example = (num1*num2)+' : ' + num2 + ' = [' + '      ]';
        return example;    
    } else {
        example = num1 + ' * ' + num2 + ' = [' + '      ]';
        return example;
    }
}

function isFileExists(fileName){
    return fs.existsSync(fileName);
}

function deleteFile(fileName) {
    fs.unlinkSync(fileName);
}

function writeTextToFile(text, i){
    // fs.appendFile(fileName, text, (err) => {
    //     if (err) throw err;
    // });
    if(i % 2 === 0){
        fs.appendFileSync(fileName, text.toString() + "\t");
    } else {
        fs.appendFileSync(fileName, "\t\t\t" + text.toString() + "\n\n");
    }
    
}

function processInput(text){     
  fs.open(fileName, 'a', 666, function( e, id ) {
   fs.write( id, text + "\n", null, 'utf8', function(){
    fs.close(id, function(){
     //console.log('file is updated');
    });
   });
  });
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
