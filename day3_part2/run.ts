// const text = await Deno.readTextFile("./sample.txt");
 const text = await Deno.readTextFile("./data1.txt");



const rucksacks = text.split("\n");

interface Group {
    data: [string,string,string] | string[]
    badge: string
    badgeval: number
    proc?: Processed[]
}

interface Processed {
    left: string;
    right: string;
    dups: string;
    val: number;
}

let groups: Group[] = [];
let group: string[] = [];
rucksacks.forEach((r, id) => {
    group.push(r);
    if (group.length === 3) {
        groups.push({ data: group, badge: "", badgeval: 0 });
        console.log('push');
        group = [];
    }

})


const findDuplicates = (l: string, r: string) => {
    let dup: string = "";
    l.split('').forEach(c => {
        if (r.includes(c)) dup += c
    })
    return dup;
}

const valOfChar = (input: string) => {

    if (input.toLowerCase() === input) return input.charCodeAt(0) - 96;

    return input.charCodeAt(0) - (64 - 26);
}

let total = 0;
rucksacks.map((r, i) => {
    // console.log(i);
    // console.log(r.length)
    const left = r.slice(0, r.length / 2)
    const right = r.slice(-r.length / 2)
    console.log({ left, right })

    const dups = findDuplicates(left, right);
    // console.log(dups)
    const val = valOfChar(dups[0]);
    console.log(val);
    total += val;
})



console.log(total);
// .charCodeAt(i);



/////////

const findTeamDups = (team:[string,string,string]) => {
    const dups = findDuplicates(findDuplicates(team[0], team[1]), team[2]);
    console.log(dups);
    return dups[0];
}

groups = groups.map(g => {
    findTeamDups(g.data as [string,string,string]);
    g.badge = findTeamDups(g.data as [string,string,string]);
    g.badgeval = valOfChar(g.badge);
    return g;
})

console.log(groups);

let badgeTotal = 0;
groups.forEach( g => {
    badgeTotal += g.badgeval
})

console.log(badgeTotal);