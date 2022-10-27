export default {
    computed: {
        favorites() {
            return this.$store.state.favorites
        },
        favoritesIds() {
            return this.$store.state.favoritesIds
        }
    },
    methods: {
        addFavorite(id) {
            if (!localStorage.getItem('favorites')) {
                const favArr = [];
                favArr.push(this.furByIdArg(id))
                localStorage.setItem('favorites', JSON.stringify(favArr))
            } else {
                const favArr = JSON.parse(localStorage.getItem('favorites'))
                const index = favArr.map(item => item.id).indexOf(this.furByIdArg(id).id)
                if (index != -1) {
                    favArr.splice(index, 1)
                    localStorage.setItem('favorites', JSON.stringify(favArr))
                } else {
                    favArr.push(this.furByIdArg(id))
                    localStorage.setItem('favorites', JSON.stringify(favArr))
                }
            }
            this.$store.commit('updateFavorites')
        },
        furByIdArg(id) {
            return this.$store.getters.specialFurById(id)
        },
    },
}