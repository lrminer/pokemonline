const getSpecies = require('./getSpecies');

class Pokemon {
    constructor(species, level, ivs, evs, stats, moves, status, name) {
        // if moves are not provided, calculate them from species and level
        // if name is not provided, calculate it from species
        // sprites are determined by species client side.
        this.species = species;
        this.level = level;

        this.ivs = ivs || {
            attack: Pokemon.generateIV(),
            defense: Pokemon.generateIV(),
            speed: Pokemon.generateIV(),
            special: Pokemon.generateIV()
        };

        this.ivs.hp = Pokemon.calculateHPIV(this.ivs);

        this.evs = evs || {
            attack: 0,
            defense: 0,
            speed: 0,
            special: 0,
            hp: 0
        };

        this.moves = moves || this.getDefaultMoves(); // Auto calculate if not provided
        this.name = name || this.getSpecies().name.toUpperCase(); // auto calculate if not provided
        this.stats = stats || this.calculateStats(); // calculate if not provided

        this.status = status;

        this.statChanges = {
            attack: 0,
            defense: 0,
            speed: 0,
            special: 0,
            accuracy: 0
        }

        this.confused = false;
    }

    publicStats() {
        // return the species, name, level, %HP, and status
        return {
            species: this.species,
            name: this.name,
            level: this.level,
            pctHP: this.stats.hp / this.stats.maxHp,
            status: this.status
        };
    }

    privateStats() {
        // returns stats only available to the owner of the pokemon
        return {
            species: this.species,
            name: this.name,
            level: this.level,
            stats: this.stats,
            status: this.status,
            moves: this.moves
        };
    }

    getSpecies() {
        // returns the data for the pokemon
        return getSpecies(this.species);
    }

    getDefaultMoves() {
        // assume learnset is sorted for now
        // console.log(this);
        const { learnset } = this.getSpecies();
        const moveset = [];
        for (let i = learnset.length - 1; i >= 0 && moveset.length < 4; i--) {
            if (learnset[i].level <= this.level) {
                // TODO: look up max PP for move
                moveset.push({ name: learnset[i].name, PP: 20, maxPP: 20 });
            }
        }
        return moveset;
    }

    resetBattleStats() {
        this.confused = false;
        this.statChanges = {
            attack: 0,
            defense: 0,
            speed: 0,
            special: 0,
            accuracy: 0
        }
    }

    calculateStats() {
        this.stats = {
            attack: Pokemon.calculateStat(
                this.getSpecies().baseStats.attack,
                this.ivs.attack,
                this.evs.attack,
                this.level
            ),
            defense: Pokemon.calculateStat(
                this.getSpecies().baseStats.defense,
                this.ivs.defense,
                this.evs.defense,
                this.level
            ),
            speed: Pokemon.calculateStat(
                this.getSpecies().baseStats.speed,
                this.ivs.speed,
                this.evs.speed,
                this.level
            ),
            special: Pokemon.calculateStat(
                this.getSpecies().baseStats.special,
                this.ivs.special,
                this.evs.special,
                this.level
            ),
            maxHp:
                Pokemon.calculateStat(
                    this.getSpecies().baseStats.hp,
                    this.ivs.hp,
                    this.evs.hp,
                    this.level
                ) +
                5 +
                this.level
        };
        this.stats.hp = this.stats.hp || this.stats.maxHp;
        return this.stats;
    }
}

// Create a pokemon object from packed pokemon data
Pokemon.fromPacked = function (packed) {
    // unpack the binary data
    return new Pokemon();
};

Pokemon.generateIV = function () {
    return Math.floor(Math.random() * 16);
};

Pokemon.calculateHPIV = function (ivs) {
    return (
        (ivs.attack % 2) * 8 +
        (ivs.defense % 2) * 4 +
        (ivs.speed % 2) * 2 +
        (ivs.special % 2)
    );
};

Pokemon.calculateStat = function (base, iv, ev, level) {
    return (
        Math.floor(
            (((base + iv) * 2 + Math.floor(Math.sqrt(ev) / 4)) * level) / 100
        ) + 5
    );
};

module.exports = Pokemon;
