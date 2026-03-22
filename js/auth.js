import { supabase } from './supabase.js'

const msg = document.getElementById('msg')

function setMessage(text, isError = false) {
  if (!msg) return
  msg.textContent = text
  msg.style.color = isError ? '#ff9b9b' : '#ffd37a'
}

window.signup = async () => {
  const email = document.getElementById('email')?.value.trim()
  const password = document.getElementById('password')?.value.trim()

  if (!email || !password) {
    setMessage('Preencha e-mail e senha.', true)
    return
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://aurapro.app.br/app.html'
    }
  })

  if (error) {
    setMessage(error.message, true)
    return
  }

  setMessage('Conta criada. Verifique seu e-mail se a confirmação estiver habilitada.')
}

window.login = async () => {
  const email = document.getElementById('email')?.value.trim()
  const password = document.getElementById('password')?.value.trim()

  if (!email || !password) {
    setMessage('Preencha e-mail e senha.', true)
    return
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    setMessage(error.message, true)
    return
  }

  window.location.href = 'app.html'
}

window.loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://aurapro.app.br/app.html'
    }
  })

  if (error) {
    setMessage(error.message, true)
  }
}

window.recoverPassword = async () => {
  const email = document.getElementById('email')?.value.trim()

  if (!email) {
    setMessage('Digite seu e-mail para recuperar a senha.', true)
    return
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://aurapro.app.br/login.html'
  })

  if (error) {
    setMessage(error.message, true)
    return
  }

  setMessage('Enviamos o link de recuperação para seu e-mail.')
}
