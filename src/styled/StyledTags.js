import { styled } from '@mui/system';
import { Divider } from "@mui/material";

export const MainTagForUserRegister = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const DividerForUserRegister = styled(Divider)(({ theme }) => ({
  fontSize: '12px',
  margin: '10px 0',
  '&::before': {
    borderTop: `1px solid ${theme.palette.secondary.main}`
  },
  '&::after': {
    borderTop: `1px solid ${theme.palette.secondary.main}`
  }
}))

export const SpanForUserRegister = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  cursor: 'pointer',
}))

export const FormForUserRegister = styled('form')({
  display: "flex", flexDirection: "column", gap: "10px"
})
