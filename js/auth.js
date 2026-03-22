// 🔥 AUTH.JS COMPLETO - AURA FINANÇAS

function setMessage(msg, error = false) {
  const el = document.getElementById('msg')
  if (!el) return
  el.style.color = error ? 'red' : 'lightgreen'
  el.innerText = msg
}

// ================= LOGIN =================
window.login = async function () {
  const email = document.getElementById('email')?.value.trim()
  const password = document.getElementById('password')?.value.trim()

  if (!email || !password) {
    setMessage('Preencha e-mail e senha.', true)
    return
  }

  const { data, error } = await window.supabase.auth.signInWithPassword({
    email,
    password
  })

  console.log('login:', { data, error })

  if (error) {
    setMessage(error.message, true)
    return
  }

  setMessage('Login realizado com sucesso.')
  window.location.href = '/'
}

// ================= SIGNUP =================
window.signup = async function () {
  const email = document.getElementById('email')?.value.trim()
  const password = document.getElementById('password')?.value.trim()

  if (!email || !password) {
    setMessage('Preencha e-mail e senha.', true)
    return
  }

  const { data, error } = await window.supabase.auth.signUp({
    email,
    password
  })

  console.log('signup:', { data, error })

  if (error) {
    setMessage(error.message, true)
    return
  }

  // 🔥 CRIA PERFIL FREE AUTOMATICAMENTE
  if (data.user) {
    const { error: profileError } = await window.supabase
      .from('profiles')
      .insert([
        {
          user_id: data.user.id,
          plano: 'free'
        }
      ])

    console.log('profile insert:', profileError)
  }

  setMessage('Conta criada com sucesso.')
}

// ================= GOOGLE =================
window.loginWithGoogle = async function () {
  const { error } = await window.supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://aurapro.app.br/entrar.html'
    }
  })

  if (error) {
    setMessage(error.message, true)
  }
}

// ================= RECUPERAR SENHA =================
window.recoverPassword = async function () {
  const email = document.getElementById('email')?.value.trim()

  if (!email) {
    setMessage('Digite seu e-mail primeiro.', true)
    return
  }

  const { error } = await window.supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://aurapro.app.br/entrar.html'
  })

  if (error) {
    setMessage(error.message, true)
    return
  }

  setMessage('Email de recuperação enviado!')
}
