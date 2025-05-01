import { TProducts } from "@customtypes/TProducts.types";
import { createSlice } from "@reduxjs/toolkit";
import { getItemsinWishList } from "./actGetItemsinWishList";
import { TLoading } from "@customtypes/TLoading.types";


interface IWishState {
    selectedItem: { [key: string]: number }
    wishItemState: { [key: string]: boolean }
    products: TProducts[]
    loading: TLoading
    error: null | string
}



const initialState: IWishState = {
    selectedItem: {},
    wishItemState: {},
    products: [],
    loading: 'idle',
    error: null
}


const WishListSlice = createSlice({

    name: "WishList",
    initialState,
    reducers: {

        setWishList: (state, action) => {

            state.wishItemState = action.payload

        },
        storedWishListItems: (state, action) => {

            state.selectedItem = action.payload


        },

        wishListState: (state, action) => {
            const id = action.payload
            if (!state.selectedItem[id]) {
                state.selectedItem[id] = 1
                state.wishItemState[id] = true
            } else {
                delete state.selectedItem[id]
                delete state.wishItemState[id]
                localStorage.removeItem(id)
                // state.products = state.products.filter((el) =>
                //     el.id != action.payload)
            }

        },
        removeItemfromWishlist: (state, action) => {
            const id = action.payload
            if (state.selectedItem[id]) {
                delete state.selectedItem[id]
                delete state.wishItemState[id]
                localStorage.removeItem(id)
            }

        }
        ,
        cleanUPWishList: (state) => {
            state.products = []
            state.selectedItem = {}
            state.wishItemState = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getItemsinWishList.pending, state => {
            state.loading = "pending"
        })
        builder.addCase(getItemsinWishList.fulfilled, (state, action) => {

            state.loading = "succeeded"
            state.products = action.payload
        })
        builder.addCase(getItemsinWishList.rejected, (state, action) => {

            state.loading = "failed"
            if (action.error && typeof action.error.message === "string") {
                state.error = action.error.message
            } else {
                state.error = "Failed to fetch products"
            }

        })
    }
}
)


export const { wishListState, removeItemfromWishlist, cleanUPWishList, setWishList, storedWishListItems } = WishListSlice.actions
export const WishListReducer = WishListSlice.reducer