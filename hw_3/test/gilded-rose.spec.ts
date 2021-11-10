import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    it('positive quality', function() {
        const gildedRose = new GildedRose([ new Item('foo', 2, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
    });

    it('Backstage passes to a TAFKAL80ETC concert', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 3, 3)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(7);
    });

});
