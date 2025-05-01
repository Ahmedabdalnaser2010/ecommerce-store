import { TProducts } from "./TProducts.types"


export type TOrder = {
    id?: number
    userId: number
    itemsInCart: TProducts[]
    itemsInWishList?: { [key: string]: number }
    stateItemsInWishList?: { [key: string]: boolean }
    allItems: { [key: string]: number }
    excuted: boolean
    subTotal?: number

}