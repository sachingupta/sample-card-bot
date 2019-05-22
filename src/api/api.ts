import { CardFactory } from 'botbuilder'

// Function to handle query fomr bot and output a list of desired items as adaptive cards
export const handleQuery = (searchtext:string, data:Array<any>, heroCard:any) => {
    // Writing 'all' in the search bar will display all cards stored
    if (searchtext === 'all' || !searchtext) {
        return (createPreviewList(data, heroCard))
    }
    // Writing anything else in the search bar will filter the displayed cards
    else {
        let queriedItems = [];
        data.forEach((item:any) => {
            if(item.title.toLowerCase().includes(searchtext.trim().toLowerCase())){
                queriedItems.push(item);
            }
        })
        return (createPreviewList(queriedItems,heroCard))
    }
} 

// Function to process a list of items into a list of cards for output
export const createPreviewList = (items:Array<any>, heroCard:any) => {
    let out = items.map((item:any) => {
        return ({
            ...heroCard,
            preview: CardFactory.thumbnailCard(item.title, item.subTitle,[item.heroImageSrc]),
        })
    })
    return out;
}