type cart = { cart: any; total: number }
const initialValue: cart = {
  cart: [],
  total: 0
}

const rootReducer = (state = initialValue, action: any) => {
  switch (action.type) {
    case 'cart/add':
      const newProduct = { ...action.payload }
      const existProduct = state.cart.find((item: any) => item._id === newProduct._id)

      let newCart = [...state.cart]

      if (!existProduct) {
        newProduct.total = newProduct.quantity1 * newProduct.sale_price
        newCart = [...state.cart, newProduct]
      } else {
        existProduct.quantity1 += newProduct.quantity1
        existProduct.total += newProduct.quantity1 * newProduct.sale_price
      }

      console.log(newCart)
      return {
        cart: newCart,
        total: newCart.reduce((accu, item) => accu + item.total, 0)
      }

    case 'cart/increase':
      const productIncreseId = action.payload
      console.log(productIncreseId)

      const product = state.cart.find((item: any) => item._id === productIncreseId)
      console.log(product)

      product.quantity1 += 1
      product.total += product.sale_price

      const cart = [...state.cart]

      return {
        ...state,
        cart: cart,
        total: cart.reduce((accu, item) => accu + item.total, 0)
      }

    case 'cart/decrease':
      const productDecreseId = action.payload

      const productt = state.cart.find((item: any) => item._id === productDecreseId)

      productt.quantity1 -= 1
      let cartt
      productt.total -= productt.sale_price
      if (productt.quantity1 < 1) {
        const delePR = state.cart.filter((item: any) => item._id !== productDecreseId)
        cartt = [...delePR]
      } else {
        cartt = [...state.cart]
      }

      return {
        ...state,
        cart: cartt,
        total: cartt.reduce((accu, item) => accu + item.total, 0)
      }

    case 'cart/delete':
      const productDeleteId = action.payload

      const newC = state.cart.filter((item: any) => item._id !== productDeleteId)
      const carta = [...newC]
      return {
        ...state,
        cart: carta,
        total: carta.reduce((accu, item) => accu + item.total, 0)
      }

    default:
      return state
  }
}

export default rootReducer
