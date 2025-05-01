import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";



// const checkExistingItemsByUserId = createSelector(
//     (state: RootState) => state.placeOrder.order,
//     (useID) => {
//         const totalQs = Object.values(useID).flatMap(ele => ele.userId)

//         return totalQs
//     }
// )


// const checkExistingItemsByExcution = createSelector(
//     (state: RootState) => state.placeOrder.order,
//     (useID) => {
//         const totalQs = Object.values(useID).flatMap(ele => ele.excuted)

//         return totalQs
//     }
// )





const existingItems = createSelector(
    (state: RootState) => state.placeOrder.order,
    (itemsInCart) => {
        const totalQs = itemsInCart.length > 0 ?

            Object.values(itemsInCart).flatMap(ele => ele.itemsInCart).flatMap(el => el.quantities).reduce((prev, curr) => Number(prev) + Number(curr)) : 0;

        return totalQs
    }
)



const totalQuantitiesOfAllItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
        const totalQs = Object.values(items).reduce((prev, curr) => { return prev + (curr || 0) }, 0)

        return totalQs
    }
)


export { totalQuantitiesOfAllItems, existingItems }