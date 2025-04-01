import { Paper, Typography, Box, Button } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities"
import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { activitySchema, ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {

    // Using react hook form
    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema),
    });

    const navigate = useNavigate()

    const { id } = useParams()
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id)

    useEffect(() => {
        if (activity) reset({
            ...activity,
            location: {
                city: activity.city,
                venue: activity.venue,
                latitude: activity.latitude,
                longitude: activity.longitude
            }
        })
    }, [activity, reset])

    const onSubmit = async (data: ActivitySchema) => {
        // Destructure all of the properties so that we can flatten the object to send it to our database
        const {location, ...rest} = data
        // All of the properties are now in flattendeddata
        const flattendedData = {...rest, ...location}
        try {
            if (activity) {
                // Editing an activity
                updateActivity.mutate({...activity, ...flattendedData}, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                })
            } else {
                // Creating a brand new activity
                createActivity.mutate(flattendedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoadingActivity) return <Typography>Loading activity...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary" sx={{ pb: 1 }}>
                {activity ? 'Editing Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description' multiline rows={3} />
                <Box display='flex' gap={1}>
                    <SelectInput items={categoryOptions} label='Category' control={control} name='category' />
                    <DateTimeInput label='Date' control={control} name='date' />
                </Box>
                <LocationInput control={control} label='Enter the location' name="location" />
                <Box display='flex' justifyContent='end' gap={1}>
                    <Button loading={updateActivity.isPending || createActivity.isPending}
                        type="submit"
                        color='success'
                        variant="outlined"
                    >Submit</Button>
                    <Button component={Link} to={activity ? `/activities/${id}` : '/activities'} color='inherit' variant="outlined">Cancel</Button>
                </Box>
            </Box>
        </Paper>
    )
}