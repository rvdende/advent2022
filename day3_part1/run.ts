// const text = await Deno.readTextFile("./sample.txt");
const text = await Deno.readTextFile("./data1.txt");

const rucksacks = text.split("\n");


const findDuplicates = (l:string,r:string) => {
    const dup: string[] = [];
    l.split('').forEach( c => {
        if (r.includes(c)) dup.push(c)
    })
    return dup;
}

const valOfChar = (input:string) => {

    if (input.toLowerCase() === input) return input.charCodeAt(0) - 96;

    return input.charCodeAt(0)- ( 64-26);
}

let total = 0;
rucksacks.map( (r,i)=> {
    // console.log(i);
    // console.log(r.length)
    const left = r.slice(0,r.length/2)
    const right =r.slice(-r.length/2) 
    console.log({left,right})

    const dups = findDuplicates(left,right);
    // console.log(dups)
    const val = valOfChar(dups[0]);
    console.log(val);
    total += val;
})

console.log(total);
// .charCodeAt(i);