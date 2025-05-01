import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { categorySliceReducer } from './Slices/Categories/CategorySlice'
import { productReducer } from './Slices/Products/ProductsSlice'
import { ProdSameCatReducer } from './Slices/ProdSameCat/ProdSameCatSlice'
import { productDetailsReducer } from './Slices/productDetails/productDetailsSlice'
import { cartReducer } from './Slices/Cart/CartSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { WishListReducer } from './Slices/WishListPage/WishListSlice'
import { registerReducer } from './Slices/registerSlice/registerSlice'
import { placeOrderReducer } from './Slices/PlaceOrder/PlaceOrderSlice'

// ...

// for nested presist

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart', 'WishList', 'auth']
}


const cartPersistconfig = {
    key: "cart",
    storage,
    whitelist: ["items"]
}



const wishlistPersistconfig = {
    key: "WishList",
    storage,
    whitelist: ["selectedItem", "wishItemState"]
}

const authPersistconfig = {
    key: "auth",
    storage,
    whitelist: ["accessToken", "user"]
}


const rootReducer = combineReducers({
    auth: persistReducer(authPersistconfig, registerReducer),
    category: categorySliceReducer,
    products: productReducer,
    ProdSameCat: ProdSameCatReducer,
    productDetails: productDetailsReducer,
    cart: persistReducer(cartPersistconfig, cartReducer),
    WishList: persistReducer(wishlistPersistconfig, WishListReducer),
    placeOrder: placeOrderReducer

})

const presistedReducer = persistReducer(rootPersistConfig, rootReducer)

// const store = configureStore({
//     reducer:
//         rootReducer

// })
const store = configureStore({
    reducer: presistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    "toasts/addToast",
                ],
                ignoredPaths: [/^toasts\.records\.\d+\.onCloseToast$/],
            },
        }),
});
const persistor = persistStore(store)

export { store, persistor, presistedReducer }
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch