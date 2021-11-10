export class Item {
    name: string;
    sellIn: number;
    quality: number;
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let item of this.items) {
            let qualityLoss: number = 1;
            let sellInLoss: number = 1;
            switch (item.name) {
                case 'Aged Brie':
                    qualityLoss *= -1
                    break
                case 'Sulfuras, Hand of Ragnaros':
                    qualityLoss = 0
                    sellInLoss = 0
                    break
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (item.sellIn < 11) {
                        qualityLoss += 2
                    }
                    if (item.sellIn < 6) {
                        qualityLoss += 1
                    }
                    if (item.sellIn < 0) {
                        item.quality = 0
                    }
                    qualityLoss *= -1
                    break
                case 'Conjured':
                    qualityLoss *= 2
                    break   
            }
            if (item.sellIn < 0) {
                qualityLoss *= 2
            }
            item.quality -= qualityLoss
            item.sellIn -= sellInLoss
            console.log(item.quality)
            item.quality = Math.max(Math.min(item.quality, 50), 0);
        }

        return this.items;
    }
}
