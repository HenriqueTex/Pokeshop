import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAdmin } from '../lib/api'
import './admin.css'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useMutation({
    mutationFn: () => loginAdmin(email, password),
    onSuccess: (result) => {
      queryClient.setQueryData(['admin-session'], result)
      navigate('/admin', { replace: true })
    },
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login.mutate()
  }

  return <main className="admin-login"><Link to="/home" className="shop-logo">Triade Arte <span>Pokémon Store</span></Link><form className="admin-login__form" onSubmit={submit}><p className="eyebrow">Área restrita</p><h1>Administração</h1><label>E-mail<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Senha<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={10} required /></label>{login.isError && <p className="admin-error" role="alert">{login.error.message}</p>}<button type="submit" disabled={login.isPending}>{login.isPending ? 'Entrando…' : 'Entrar →'}</button></form></main>
}
