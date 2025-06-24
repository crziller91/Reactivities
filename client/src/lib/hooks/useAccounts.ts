import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"

// Custom hook that encapsulates account-related operations
export const useAccounts = () => {

    const queryClient = useQueryClient()

    // Create a mutation for logging in a user
    const loginUser = useMutation({
        // The async function that will be executed when the mutation is triggered
        mutationFn: async (creds: LoginSchema) => {
            // Make a POST request to the login endpoint
            // useCookies=true tells the server to use cookie-based authentication
            // 'creds' contains the user's login credentials (username/email and password)
            await agent.post('/login?useCookies=true', creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })

    const {data: currentUser} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info')
            return response.data
        }
    })

    // Return an object containing the loginUser mutation
    // This allows components to access the mutation function and its state
    // (loading, error, success, etc.)
    return {
        loginUser,
        currentUser
    }
}