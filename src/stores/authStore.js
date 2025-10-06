import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { supabase } from "@/lib/supabaseClient";

export const useAuthStore = defineStore('user', () => {
    const currentUser = reactive({
        id: undefined,
        name: undefined,
        email: undefined,
        booksGoal: 0,
        finishedBooks: 0,
        readingBooks: 0,
        plannedBooks: 0
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
                currentUser.id = user.id
                currentUser.email = user.email
                currentUser.name = user.user_metadata.name
                currentUser.booksGoal = user.user_metadata.booksGoal

                await getBooksCount()
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

    const getBooksCount = async () => {
        const { data, error } = await supabase.rpc('get_book_progress_counts', {
            p_user: currentUser.id
        })

        if (!error) {
            updateUserBooksCount(data[0].count_finished, data[0].count_in_progress, data[0].count_not_started)
        }
        console.log('books', data)
        console.log(error)
    }

    const updateUserBooksCount = async (finished, reading, planned) => {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                finishedBooks: finished,
                readingBooks: reading,
                plannedBooks: planned
            }
        });

        console.log('update user', data)

        if (!error) {
            currentUser.finishedBooks = finished
            currentUser.readingBooks = reading,
                currentUser.plannedBooks = planned
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

    // const getFinishedBooks = async () => {
    //     const { data: books, error } = await supabase.from('books').select('*').eq('userId', currentUser.id).eq('bookProgress', 100);

    //     if (!error) {
    //         await updateUserFinishedBooks(books.length)
    //     }
    //     console.log('finished', books);
    // }

    // const updateUserFinishedBooks = async (booksCount) => {
    //     const { data, error } = await supabase.auth.updateUser({
    //         data: {
    //             finishedBooks: booksCount
    //         }
    //     });

    //     if (!error) {
    //         currentUser.finishedBooks = booksCount
    //     }

    //     console.log('update finished books', data)
    // }

    const updateUserGoal = async (goalCount) => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    booksGoal: goalCount
                }
            });

            if (!error) {
                currentUser.booksGoal = goalCount
            }
            console.log('update goal', data)

            return { data, error }
        }
        catch (error) {
            return { error }
        }

    }

    return { currentUser, isUserAuth, isUserLoading, getCurrentUser, clearUser, setUserData, updateUserGoal, getBooksCount }
})