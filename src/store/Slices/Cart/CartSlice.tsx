import { TProducts } from "@customtypes/TProducts.types"
import { createSlice } from "@reduxjs/toolkit"
import { getItemsinCart } from "./actGetItemsinCart"
import { TLoading } from "@customtypes/TLoading.types"


interface ICartItems {

    items: { [key: string]: number },
    productInfo: TProducts[],
    loading: TLoading
    error: null | string
}

const initialState: ICartItems = {

    items: {},
    productInfo: [],
    loading: "idle",
    error: null
}



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        setItems: (state, action) => {
            state.items = action.payload

        },

        increamentItems: (state, action) => {
            const id = action.payload
            if (state.items[id] > 0 && state.items[id] < 5) {
                state.items[id]++
            } else if (state.items[id] >= 5) {
                state.items[id] = 5
            } else {
                state.items[id] = 1
            }


        }
        ,
        decreamentItems: (state, action) => {
            const id = action.payload

            if (state.items[id] > 1) {
                state.items[id]--
            } else if (state.items[id] == 1) {
                state.items[id] = 1

            }

        },
        removeItem: (state, action) => {
            const id = action.payload
            delete state.items[id]
            localStorage.removeItem(id)
            state.productInfo = state.productInfo.filter((el) =>
                el.id != action.payload
            )
        },
        clearItemsAfterOrdering: (state) => {

            state.items = {}
            state.productInfo = []
        }
        ,
        saveItemsAfterLogoutWithOutOrdering: (state, action) => {
            state.items = action.payload
            state.productInfo = action.payload
        }


    },
    extraReducers: (builder) => {
        builder.addCase(getItemsinCart.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(getItemsinCart.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productInfo = action.payload;
        })
        builder.addCase(getItemsinCart.rejected, (state, action) => {
            state.loading = "failed"
            if (action.error && typeof action.error === "string") {
                state.error = action.error
            } else {
                state.error = 'Failed to fetch categories'
            }

        })

    }
})




export { getItemsinCart }
export const { increamentItems, decreamentItems, removeItem, clearItemsAfterOrdering, saveItemsAfterLogoutWithOutOrdering, setItems } = cartSlice.actions
export const cartReducer = cartSlice.reducer