// const text = await Deno.readTextFile("./example.txt");
const text = await Deno.readTextFile("./day1data.txt");

let o;

o = text.split("\n")



let elves: number[] = [];
let tot = 0;
o.forEach( f => {
    
    if (f === "") {
        elves.push(tot)
        tot = 0;
    } else {
        tot += parseInt(f);
    }  
})


let highest = {
    id : 0,
    score: 0
}

elves.forEach( (elf, i) => {
    if (elf > highest.score) {
        highest.score = elf;
        highest.id = i+1;
    }

})

console.log(highest);