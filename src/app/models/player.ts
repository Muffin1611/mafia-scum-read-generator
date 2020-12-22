export class Player {
    name: string;
    alive: boolean;

    constructor(name: string, alive: boolean) {
        this.name = name;
        this.alive = alive;
    }
}

export class Team {
    name1: string;
    name2: string;
    alive: boolean;

    constructor(name1: string, name2:string, alive: boolean) {
        this.name1 = name1;
        this.name2 = name2;
        this.alive = alive;
    }
}