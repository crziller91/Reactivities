import { useForm } from "react-hook-form"
import { useAccounts } from "../../lib/hooks/useAccounts"
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Paper, Typography } from "@mui/material"
import { LockOpen } from "@mui/icons-material"
import TextInput from "../../app/shared/components/TextInput"

export default function LoginForm() {

  const { loginUser } = useAccounts()
  const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data)
  }

  return (
    <Paper
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 3,
        maxWidth: 'md',
        mx: 'auto',
        borderRadius: 3
      }}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        gap={3}
        color='secondary.main'
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign In</Typography>
      </Box>
      <TextInput label='Email' control={control} name='email' />
      <TextInput label='Password' type='password' control={control} name='password' />
      <Button
        type='submit'
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Login
      </Button>
    </Paper>
  )
}