import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { supabase } from "@/lib/supabaseClient";

export const useAuthStore = defineStore('user', () => {
    const currentUser = reactive({
        name: undefined,
        email: undefined
    });

    const isUserAuth = computed(() => {
        return currentUser.name ? true : false
    })

    const getCurrentUser = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (user) {
                currentUser.email = user.email;
                currentUser.name = user.user_metadata.name
            }
            else {
                currentUser.email = undefined
                currentUser.name = undefined
            }

            console.log('user', user)
            console.log('cur user', currentUser)
        } catch (error) {
            console.error('error from user', error)
        }
    }

    return { currentUser, isUserAuth, getCurrentUser }
})