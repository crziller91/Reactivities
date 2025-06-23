import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"
import { useLocation } from "react-router"
import { Activity } from "../types"

export const useActivities = (id?: string) => { // Make the ID parameter optional

    const queryClient = useQueryClient()
    const location = useLocation()

    // Using React Query to get the list of activities from our database
    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities')
            return response.data
        },
        enabled: !id && location.pathname === '/activities',
        staleTime: 1000 * 60 * 5 // The list will be fresh for 5 min until it is stale
    })

    // Gets an individual activity from the list of activities
    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`)
            return response.data
        },
        enabled: !!id, // This only gets executed if we have the id
    })

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post('/activities', activity)
            return response.data // Should be the id of the created activity
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ // We are telling react query here to go out and get the updated data from our API
                queryKey: ['activities']
            })
        }
    })

    return {
        activities,
        isPending,
        activity,
        isLoadingActivity,
        updateActivity,
        createActivity,
        deleteActivity
    }
}