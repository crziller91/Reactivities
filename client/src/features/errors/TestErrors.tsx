import { Alert, Button, ButtonGroup, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import agent from "../../lib/api/agent.ts";
import {useState} from "react";

export default function TestErrors() {

    // We are storing some validation errors when we get them back
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    
    /* We are using the use mutation hook that we're getting from react query
    and we're destructuring the mutate method from inside here */
    const { mutate } = useMutation({
        // Creating a mutation function so we can use it for several different requests
        mutationFn: async ({ path, method = 'get' }: { path: string; method: string }) => {
            if (method === 'post') await agent.post(path, {});
            else await agent.get(path);
        },
        onError: (err) => {
            if (Array.isArray(err)) {
                setValidationErrors(err);
            } else {
                setValidationErrors([]);
            }
        },
    });

    const handleError = (path: string, method = 'get') => {
        mutate({path, method});
    };

    return (
        <>
            <Typography variant="h4">Test errors component</Typography>

            <ButtonGroup variant="contained" sx={{ mt: 4 }}>
                <Button onClick={() => handleError('buggy/not-found')}>
                    Not found
                </Button>
                <Button onClick={() => handleError('buggy/bad-request')}>
                    Bad request
                </Button>
                <Button onClick={() => handleError('activities', 'post')}>
                    Validation error
                </Button>
                <Button onClick={() => handleError('buggy/server-error')}>
                    Server error
                </Button>
                <Button onClick={() => handleError('buggy/unauthorised')}>
                    Unauthorised
                </Button>
            </ButtonGroup>

            {validationErrors.map((err, i) => (
                <Alert key={i} severity='error'>
                    {err}
                </Alert>
            ))}
        </>
    );
}