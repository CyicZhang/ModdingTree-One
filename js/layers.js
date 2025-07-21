addLayer("w", {
    name: "wood", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#964B00",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "woods", // Name of prestige currency
    baseResource: "time", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for wood", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
        upgrades: {
        11: {
            title: "start",
            description: "you found a new game! you spend some time playing it.",
            cost: new Decimal(0),
        },
        12: {
            title: "first tree!",
            description: "you collected some wood. They boost your ethusiasm which multiplies time gained.",
            cost: new Decimal(3),
            unlocked(){
		        return hasUpgrade("w",11)
		    },
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.3)
                if (hasUpgrade('w', 13)) eff = eff.times(upgradeEffect('w', 13));
                eff = softcap(eff,new Decimal(5),0.2)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "wood ethusiast",
            description: "it's always fun to see number go up! 'first tree!' is strengthened based on wood. ",
            cost: new Decimal(5),
            unlocked(){
		        return hasUpgrade("w",12)
		    },
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.075)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "crafting table",
            description: "something much greater beyond this. Unlock 2 upgrades.",
            cost: new Decimal(9),
            unlocked(){
		        return hasUpgrade("w",13)
		    },
        },
    },
})
