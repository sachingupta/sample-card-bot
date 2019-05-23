"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
// Function to handle query fomr bot and output a list of desired items as adaptive cards
exports.handleQuery = (searchtext, data, heroCard) => {
    // Writing 'all' in the search bar will display all cards stored
    if (searchtext === 'all' || !searchtext) {
        return (exports.createPreviewList(data, heroCard));
    }
    // Writing anything else in the search bar will filter the displayed cards
    else {
        let queriedItems = [];
        data.forEach((item) => {
            if (item.title.toLowerCase().includes(searchtext.trim().toLowerCase())) {
                queriedItems.push(item);
            }
        });
        return (exports.createPreviewList(queriedItems, heroCard));
    }
};
// Function to process a list of items into a list of cards for output
exports.createPreviewList = (items, heroCard) => {
    let out = items.map((item) => {
        return (Object.assign({}, heroCard, { preview: botbuilder_1.CardFactory.thumbnailCard(item.title, item.subTitle, [item.heroImageSrc]) }));
    });
    return out;
};
//# sourceMappingURL=api.js.map