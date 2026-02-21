export const authservice = {
  login(email, password) {
    const exist = users.find((u)=>u.password===password && u.email ===email)
    if (exist){
      const fakeToken = 'test' + Date.now()
      localStorage.setItem('key_name', fakeToken)
      localStorage.setItem('user', JSON.stringify({email: email}))
      return true
    }else{
        return false
    }
  },

  logout() {
    localStorage.removeItem('key_name')
    localStorage.removeItem('currentUser')
  },

  isAuthenticated() {
    return localStorage.getItem('key_name') !== null ? true : false
  },
}