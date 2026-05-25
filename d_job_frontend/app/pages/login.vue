<script setup>
    import {useUserStore} from '@/stores/user'
    const router = useRouter()
    const userStore = useUserStore()

    let email = ref('')
    let password = ref('')
    let errors = ref([])
    async function submitForm(){
        console.log('submitForm')

        errors.value = []

        await $fetch('http://127.0.0.1:8000/api/v1/token/login/', {
            method: 'POST',
            body: {
                username: email.value,
                password: password.value
            }
        }).then(data => {
            console.log('response', data.auth_token)
            userStore.setToken(data.auth_token, email.value)
            router.push({path: '/'})

        }).catch(error => {
            if (error.response) {
                for (const property in error.response.data) {
                    errors.value.push('${property}: ${error.response.data[property]}')
                }
                console.log(JSON.stringify(error.response))
            } else if (error.message) {
                errors.value.push('An error occurred. Please try again.')
                console.log(JSON.stringify(error))
            }
        })
    }
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-6 py-10">
        <div class="w-full max-w-sm py-10 px-6 bg-gray-100 rounded-xl">
            <h1 class="mb-6 text-2xl">Log in</h1>

            <form v-on:submit.prevent="submitForm">
                <input v-model="email" type="email" placeholder="youremail@email.com" class="w-full mb-4 py-4 px-6 rounded-xl bg-white text-black placeholder-gray-500">
                <input v-model="password" type="password" placeholder="password" class="w-full mb-4 py-4 px-6 rounded-xl bg-white text-black placeholder-gray-500">

                <div 
                    v-if="errors.length"
                    class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl"
                >
                    <p v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </p>
                </div>

                <button class="py-4 px-6 bg-teal-700 text-white rounded-xl">Submit</button>

            </form>

        </div>
    </div>
</template>