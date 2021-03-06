const NPC = require('../npc/NPC');
const events = require('../npc/events');
const _ = {
    collision: false,
    flags: {}
}

const $ = {
    collision: true,
    flags: {}
}

const L = {
    collision: 'ledge',
    flags: {}
}

const G = {
    collision: false,
    flags: {
        encounter: true
    }
}

module.exports = {
    name: 'Route 1',
    width: 18,
    height: 36,
    connections: {
        'south': {
            name: 'Pallet Town',
            offset: { x: -4, y: 36 }
        },
        'north': {
            name: 'Viridian City',
            offset: { x: -13, y: -36 }
        }
    },
    encounterParams: {
        density: 25,
        encounters: [
            { species: 16, lvl: 3 }, // 51/256 (20%) 
            { species: 19, lvl: 3 }, // 51/256 (20%) 
            { species: 19, lvl: 3 }, // 39/256 (15%)
            { species: 19, lvl: 2 }, // 25/256 (10%)
            { species: 16, lvl: 2 }, // 25/256 (10%)
            { species: 16, lvl: 3 }, // 25/256 (10%)
            { species: 16, lvl: 3 }, // 13/256 (5%)
            { species: 19, lvl: 4 }, // 13/256 (5%)
            { species: 16, lvl: 4 }, // 11/256 (4%)
            { species: 16, lvl: 5 }, // 3/256 (1%)
        ]
    },
    tiles: [
        _, $, _, _, _, _, _, $, _, _, $, _, _, _, _, _, $, _,
        _, $, $, $, $, $, $, $, _, _, $, $, $, $, $, $, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, $, _, _, _, _, _, _, _, _, $, _,
        _, $, L, L, L, L, L, $, L, L, L, L, _, _, _, _, $, _,
        _, $, _, _, _, _, _, $, G, G, G, G, G, G, G, G, $, _,
        _, $, _, _, _, _, _, $, G, G, G, G, G, G, G, G, $, _,
        _, $, _, _, _, _, _, $, G, G, G, G, G, G, G, G, $, _,
        _, $, L, L, L, L, L, $, G, G, G, G, G, G, G, G, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, G, G, G, G, $, _,
        _, $, $, $, L, L, L, L, $, $, $, $, G, G, G, G, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, G, G, G, G, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, G, G, G, G, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, L, _, L, L, L, _, L, L, L, L, L, L, L, L, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, G, G, G, G, _, _, $, _,
        _, $, $, $, $, $, $, $, $, $, G, G, G, G, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, G, G, G, G, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, G, G, G, G, _, _, $, _,
        _, $, _, _, _, _, _, _, _, _, _, _, _, _, _, _, $, _,
        _, $, L, L, _, _, _, $, L, L, L, L, L, L, L, L, $, _,
        _, $, _, _, G, G, G, G, _, _, _, _, G, G, G, G, $, _,
        _, $, _, _, G, G, G, G, _, _, _, _, G, G, G, G, $, _,
        _, $, G, G, G, G, _, _, _, _, G, G, G, G, _, _, $, _,
        _, $, G, G, G, G, _, _, _, _, G, G, G, G, _, _, $, _,
        _, $, $, $, $, $, $, $, G, G, $, $, $, $, $, $, $, _,
        _, $, _, _, _, _, _, $, G, G, $, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, $, G, G, $, _, _, _, _, _, $, _,
        _, $, _, _, _, _, _, $, G, G, $, _, _, _, _, _, $, _
    ],
    npcs: [
        new NPC('Route 1\nPallet Town - Viridian City'),
        new NPC('See those ledges along the road?\n' +
            'It\'s a bit scary,\n' + 'but you can jump from them.\n' +
            'You can get back to PALLET TOWN quicker that way'),
        new NPC([
            {
                type: 'dialog',
                message: 'The path to\n Pallet Town is currently under construction.\nLet me heal your Pokemon.'
            },
            {
                type: 'event',
                event: events.heal,
            },
            {
                type: 'event',
                event: events.setPokecenter,
                args: ['demo']
            }
        ]),
        new NPC('Chansey~'),
        new NPC('Route to Viridian City closed.')
    ]
}

