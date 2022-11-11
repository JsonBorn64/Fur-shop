export default {
    data() {
        return {
            selectedSize: '',
            sizeAlert: false
        }
    },
    computed: {
        cartItems() {
            return this.$store.state.cartItems
        },
        cartItemsIds() {
            return this.$store.state.cartItemsIds
        }
    },
    methods: {
        addcartItem(id) {
            const fur = JSON.parse(JSON.stringify(this.furByIdArg(id)))
            fur.Size = this.selectedSize
            if (!localStorage.getItem('cart') && this.selectedSize) {
                const cartArr = [];
                cartArr.push(fur)
                localStorage.setItem('cart', JSON.stringify(cartArr))
            } else {
                const cartArr = JSON.parse(localStorage.getItem('cart'))
                const index = cartArr.map(item => item.id).indexOf(fur.id)
                if (index != -1) {
                    cartArr.splice(index, 1)
                    localStorage.setItem('cart', JSON.stringify(cartArr))
                } else {
                    if (!this.selectedSize) {
                        this.sizeAlert = true
                        return
                    }
                    cartArr.push(fur)
                    localStorage.setItem('cart', JSON.stringify(cartArr))
                }
            }
            this.$store.commit('updateCart')
        },
        furByIdArg(id) {
            return this.$store.getters.specialFurById(id)
        },
    },
}