import Page from './page'

class AdminLoginPage extends Page {
  get url () {
    return '/login'
  }

  get username () { return $('input[type="email"]') }
  get password () { return $('input[type="password"]') }
  get submitBtn () { return $('input[type="submit"]') }

  async setUsername (username) {
    await this.username.setValue(username)
  }

  async setPassword (password) {
    await this.password.setValue(password)
  }

  async next () {
    await this.submitBtn.click()
  }
}

export default new AdminLoginPage()
