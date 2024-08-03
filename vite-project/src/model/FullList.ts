import ListItem from "./ListItem";

interface List {
    list : ListItem[], 
    load() : void, 
    save() : void, 
    clearList() : void, 
    addItem(itemObj : ListItem) : void,
    removeItem(id : string) : void 
}

export default class FullList implements List {

    static instance: FullList = new FullList()

    constructor( 
        private _list : ListItem[] = []
    ){}

    get list() : ListItem[]{
        return this._list
    }

    set list( list : ListItem[] ){
        this._list = list
    }

    load(): void{
        const list : string | null = localStorage.getItem('list')
        if(typeof list !== 'string'){
            return
        }
        const parsedList : {_id : string, _item : string, _checked : boolean}[] = JSON.parse(list)
        parsedList.forEach(el => {
            const newListItem : ListItem = new ListItem(el._id, el._item, el._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void{
        localStorage.setItem('list', JSON.stringify(this._list))
    }

    clearList(): void{
        this._list = []
        this.save()
    }

    addItem(itemObj : ListItem): void{
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = (this._list.filter(el  => el.id !== id ))
        this.save()
    }

}