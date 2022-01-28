// variables declared using "var" have their accessibility throughout the function
// variables declared using "let" have their accessibility inside its scope only
// hence we should avoid using var unless we have a very strong reason for the same.
// example:

function sayHello(){
    for(var i = 0; i < 5; i++){
        console.log(i);
    }
    console.log(i);   // Since it is declared using var, "i" is accessible here also
}

function sayHello(){
    for(let i = 0; i < 5; i++){
        console.log(i);
    }
    console.log(i); // i has a specific scope and hence giving an error(due to the use of let)
}

// when a variable is declared using "const", its value cannot be changed once assigned
// thence, we should try using const if we don't have a value that would change

//Object in JS : is basically a collection of key value pairs
// Example:

const person = {
    name:"Soumik",
    walk: function(){}, //<- When a function is defined inside an object, it is called a method.
    talk(){}, // <- a method can also be declared like this instead of the colon and the function keyword
};

// Now accessing members of an object:

// When we know ahead of time that what is gonna be the value of a member, we use the dot notation
// example

person.name = "Soumik";

// But Suppose we don't know the input and the type of the input, then we use the bracket notation:

person['name'] = inputData; // here inputData is taken as an example of a record taken

// this keyword in JS