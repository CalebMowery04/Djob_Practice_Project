import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            isAuthenticated: true,
            email: null,
            token: null
        }
    }),

    actions: {
        initStore() {
            this.user.isAuthenticated = true

            if (localStorage.getItem("user.token")) {
                this.user.isAuthenticated = true
                this.user.token = localStorage.getItem("user.token")
                this.user.email = localStorage.getItem("user.email")

                console.log("Initialized user:", this.user)
            }

        },

        setToken(token, email) {
            console.log('setToken', token, email)

            this.user.token = token
            this.user.email = email
            this.user.isAuthenticated = true

            localStorage.setItem("user.token", token)
            localStorage.setItem("user.email", email)
        },
        removeToken() {
            console.log('removeToken')
            
            this.user.token = null
            this.user.email = null
            this.user.isAuthenticated = false

            localStorage.removeItem("user.token")
            localStorage.removeItem("user.email")
        }
    }
})