import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { supabase } from "@/lib/supabaseClient";

export const useAuthStore = defineStore('user', () => {
    const currentUser = reactive({
        id: undefined,
        name: undefined,
        email: undefined,
        booksGoal: 1,
        finishedBooks: 0,
        readingBooks: 0,
        plannedBooks: 0,
        libraryCount: 0
    });

    const isUserAuth = computed(() => {
        return currentUser.id !== undefined
    })

    const userError = ref(null)

    const setUserError = (value) => {
        userError.value = value
    }

    const isUserLoading = ref(false);

    const currentBooks = ref([]);

    const getCurrentBooks = async () => {
        try {
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .gt('bookProgress', 0)
                .lt('bookProgress', 100)
                .eq('userId', currentUser.id)

            if (!error) {
                currentBooks.value = data
            }
        } catch (error) {
            console.error(error)
        }
    }

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
                currentUser.finishedBooks = user.user_metadata.finishedBooks,
                    currentUser.readingBooks = user.user_metadata.readingBooks,
                    currentUser.plannedBooks = user.user_metadata.plannedBooks,
                    currentUser.libraryCount = currentUser.finishedBooks + currentUser.plannedBooks + currentUser.readingBooks

                await getBooksCount()

                await getCurrentBooks()
            }
            else {
                clearUser()
            }
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
    }

    const updateUserBooksCount = async (finished, reading, planned) => {
        const total = finished + reading + planned

        const { error } = await supabase.auth.updateUser({
            data: {
                finishedBooks: finished,
                readingBooks: reading,
                plannedBooks: planned,
                libraryCount: total
            }
        });

        if (!error) {
            currentUser.finishedBooks = finished
            currentUser.readingBooks = reading,
                currentUser.plannedBooks = planned
            currentUser.libraryCount = total
        }
    }

    const setUserData = (id, metadata, email) => {
        currentUser.id = id
        currentUser.email = email;
        currentUser.name = metadata.name;
        currentUser.booksGoal = metadata.booksGoal
        currentUser.finishedBooks = metadata.finishedBooks,
            currentUser.readingBooks = metadata.readingBooks,
            currentUser.plannedBooks = metadata.plannedBooks,
            currentUser.libraryCount = currentUser.finishedBooks + currentUser.plannedBooks + currentUser.readingBooks
    }

    const clearUser = () => {
        currentUser.id = undefined
        currentUser.email = undefined
        currentUser.name = undefined
        currentUser.booksGoal = 1
        currentUser.finishedBooks = 0
        currentUser.readingBooks = 0
        currentUser.plannedBooks = 0
        currentUser.libraryCount = 0

    }

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

            return { data, error }
        }
        catch (error) {
            return { error }
        }

    }

    return { currentUser, isUserAuth, isUserLoading, currentBooks, userError, getCurrentUser, clearUser, setUserData, updateUserGoal, getBooksCount, getCurrentBooks, setUserError }
})