const fs = require('fs');

//callback version (host function definition)
const readFileAsArray = function(file, callback){
    fs.readFile(file, function(err,data){
        if(err){
            return callback(err);
        }
        const lines = data.toString().trim().split('\n');
        callback(null,lines);

    });
};


//promise version
const readFileAsArrayPM = function(file) {
    //wrap in a function in a promise
    return new Promise((resolve, reject) => {

        fs.readFile(file, (err,data) => {
            if(err){
                return reject(err);//failed
            }
            const lines = data.toString().trim().split('\n');
            resolve(lines); //success
        });
    });
};

//call the callback version
// readFileAsArray('./training/numbers.txt', (err,lines) => {
    
//      if (err) throw err;
//      const numbers = lines.map(Number);
//      const oddNumbers = numbers.filter( number => number % 2 === 1 );
//      console.log(oddNumbers.length);

// });


//call to to promise version
// const readfile = readFileAsArrayPM('./training/numbers.txt')
//     .then(lines => {

//     const numbers = lines.map(Number);
//     const oddNumbers = numbers.filter(number => number % 2 === 1);
//     console.log('odd numbers count: ',oddNumbers.length );

//     })
//     .catch(console.log);

async function countOdd() {
    try{
        const lines = await readFileAsArrayPM('./training/numbers.txt');
        const numbers = lines.map(Number);
        const oddNumbers = numbers.filter(number => number % 2 === 1);
        console.log('odd numbers count: ',oddNumbers.length );
    }
    catch(err){
        console.error(err);
    }
}

countOdd();