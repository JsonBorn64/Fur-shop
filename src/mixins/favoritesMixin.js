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
                this.$store.commit('setAlert', [`${this.furByIdArg(id).Name} добавлена в избранное`, 'green'])
                localStorage.setItem('favorites', JSON.stringify(favArr))
            } else {
                const favArr = JSON.parse(localStorage.getItem('favorites'))
                const index = favArr.map(item => item.id).indexOf(this.furByIdArg(id).id)
                if (index != -1) {
                    favArr.splice(index, 1)
                    this.$store.commit('setAlert', [`${this.furByIdArg(id).Name} убрана из избранных`, 'green'])
                    localStorage.setItem('favorites', JSON.stringify(favArr))
                } else {
                    favArr.push(this.furByIdArg(id))
                    this.$store.commit('setAlert', [`${this.furByIdArg(id).Name} добавлена в избранное`, 'green'])
                    localStorage.setItem('favorites', JSON.stringify(favArr))
                }
            }
            this.$store.dispatch('saveUserLocalStorage')
        },
        furByIdArg(id) {
            return this.$store.getters.specialFurById(id)
        },
    },
}