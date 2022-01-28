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
// It behaves differently based on the type it is called, lets take an example

const Person = {
    name:"Soumik",  
    talk(){
        console.log(this);  // here, this refers to the direct object it is called in.
    },
};

Person.walk(); // So, since walk calls this in its definition, this statement will print the object defintion.

const walk = Person.walk; // Here we are not calling the function, rather passing a reference to the object.
console.log(walk); // This statement prints the walk function definition.
walk(); // this does the same as line number 53.

// Arrow functions

// Lets take the example of two functions namely fun1 and fun2 but both will work the same:

const fun1 = function(number){
    return number*number;
}

const fun2 = (number) => {
    return number*number;
}

// OR this can be written as:

//const fun2 = number => number * number;  Since there is only one parameter, we can ignore the bracket
// And if we have only one statement in the function body, then we can bring it to the same line removing the brackets.

// So where can this arrow function be useful. Lets see an example:

const jobs = [
    {id: 1, isActive: true},
    {id: 2, isActive: true},
    {id: 3, isActive: false},
];

const activeJobs = jobs.filter(function(job){ return job.isActive});

/*
    So what we are doing here?
    filter is an inbuilt function that loops through the array and look for objects that satisfy the condition
    passed in it as a function.
    So here we are passing a function that checks for isActive whether it is true or not.
    The objects that satisfies the condition, get stored in the activeJobs const. 
*/

// Spread and rest operators

const hobbies = ['Sports', 'Cooking'];

const copiedArray = [...hobbies];

console.log(copiedArray);

// "..." is the spread operator which pulls out all the members of the object/array for which it is called
// and then inserts it in block it is wrapped with. So all the hobbies elements are put inside the [].

// Rest operator is just the opposite of spread operator but the operator looks the same.