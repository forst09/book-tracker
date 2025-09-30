import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { supabase } from "@/lib/supabaseClient";

export const useAuthStore = defineStore('user', () => {
    const currentUser = reactive({
        name: undefined,
        email: undefined
    });

    const isUserAuth = computed(() => {
        return currentUser.name ? true : false
    })

    const isUserLoading = ref(false);

    const getCurrentUser = async () => {
        isUserLoading.value = true
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (user) {
                currentUser.email = user.email;
                currentUser.name = user.user_metadata.name
            }
            else {
                clearUser()
            }

            console.log('user', user)
            console.log('cur user', currentUser)
        } catch (error) {
            console.error('error from user', error)
        }
        finally {
            isUserLoading.value = false
        }
    }

    const setUserData = (name, email) => {
        currentUser.email = email;
        currentUser.name = name;
    }

    const clearUser = () => {
        currentUser.email = undefined;
        currentUser.name = undefined;
    }

    return { currentUser, isUserAuth, isUserLoading, getCurrentUser, clearUser, setUserData }
})