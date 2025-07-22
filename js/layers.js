addLayer("w", {
    name: "wood", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#964B00",
    requires:function (){
		let wr = new Decimal(5);
		if (hasUpgrade('w',21)) wr = wr.sub(1)
        if (inChallenge('s',12)) wr = wr.add(2)
		return wr
	},
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
        {key: "w", description: "W: reset for wood", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
            description: "you collected some wood. they boost your ethusiasm which multiplies time gained.",
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
            description: "there's something much greater beyond this. unlock 2 new upgrades.",
            cost: new Decimal(9),
            unlocked(){
		        return hasUpgrade("w",13)
		    },
        },
        21: {
            title: "wooden axe",
            description: "a handy tool. -1 wood gain base.",
            cost: new Decimal(9),
            unlocked(){
		        return hasUpgrade("w",14)
		    },
        },
        22: {
            title: "wooden pickaxe",
            description: "only used three times. unlock a new layer.",
            cost: new Decimal(9),
            unlocked(){
		        return hasUpgrade("w",14)
		    },
        },
    },
})

addLayer("s", {
    name: "stone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires:function (){
		let wr = new Decimal(20);
		return wr
	},
    resource: "stones", // Name of prestige currency
    baseResource: "woods", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    branches: [["w","#ADADAD"]],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: reset for stone", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
        challenges: {
		11: {
			name: "scavenge this cave",
		    challengeDescription: "there's walls of stone but no wood. 0.75x time gain.",
		    unlocked() { return hasUpgrade("s",11) },
		    canComplete: function() {return player.w.points.gte(5)},
		    goalDescription:"5 wood",
		    rewardDescription: "unlock a new wood upgrade",
		},
        12: {
			name: "scavenge this cavern",
		    challengeDescription: "there's more stone and less wood. 0.6x time gain. +2 wood gain base.",
		    unlocked() { return hasUpgrade("s",11) },
		    canComplete: function() {return player.w.points.gte(10)},
		    goalDescription:"10 wood",
		    rewardDescription: "unlock a new wood upgrade",
		},
		},
        upgrades: {
        11: {
            title: "deeper",
            description: "a new resources makes you more excited. 3x time gain.",
            cost: new Decimal(1),
            effectDisplay() { return "Currently: 3x" }, 
        },
        12: {
            title: "into the mines",
            description: "in these mines... unlock 2 challenges.",
            cost: new Decimal(2),
        },
    },
})
