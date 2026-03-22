console.log('auth.js carregou')

function setMessage(text, isError = false) {
  const msg = document.getElementById('msg')
  if (!msg) return
  msg.textContent = text
  msg.style.color = isError ? '#ff9b9b' : 'yellow'
}

window.signup = async function () {
  console.log('Criar conta clicado')

  const email = document.getElementById('email')?.value.trim()
  const password = document.getElementById('password')?.value.trim()

  if (!email || !password) {
    setMessage('Preencha e-mail e senha.', true)
    return
  }

  if (!window.supabase) {
    setMessage('Supabase não foi carregado.', true)
    return
  }

  const { data, error } = await window.supabase.auth.signUp({
    email,
    password
  })

  console.log('Resposta signup:', { data, error })

  if (error) {
    setMessage(error.message, true)
    return
  }

  setMessage('Conta criada com sucesso. Agora tente entrar.')
}

window.login = async function () {
  console.log('Entrar clicado')

  const email = document.getElementById('email')?.value.trim()
  const password = document.getElementById('password')?.value.trim()

  if (!email || !password) {
    setMessage('Preencha e-mail e senha.', true)
    return
  }

  if (!window.supabase) {
    setMessage('Supabase não foi carregado.', true)
    return
  }

  const { data, error } = await window.supabase.auth.signInWithPassword({
    email,
    password
  })

  console.log('Resposta login:', { data, error })

  if (error) {
    setMessage(error.message, true)
    return
  }

  setMessage('Login realizado com sucesso.')
}

window.loginWithGoogle = async function () {
  setMessage('Google será configurado depois.')
}

window.recoverPassword = async function () {
  const email = document.getElementById('email')?.value.trim()

  if (!email) {
    setMessage('Digite seu e-mail para recuperar a senha.', true)
    return
  }

  if (!window.supabase) {
    setMessage('Supabase não foi carregado.', true)
    return
  }

  const { error } = await window.supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://aurapro.app.br/login.html'
  })

  if (error) {
    setMessage(error.message, true)
    return
  }

  setMessage('Link de recuperação enviado para seu e-mail.')
}
