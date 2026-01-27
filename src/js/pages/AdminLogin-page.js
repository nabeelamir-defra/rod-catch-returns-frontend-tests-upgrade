import Page from './page'

class AdminLoginPage extends Page {
  get url () {
    return '/login'
  }

  get username () { return $('input[type="email"]') }
  get password () { return $('input[type="password"]') }
  get submitBtn () { return $('input[type="submit"]') }

  async submit () {
    await this.submitBtn.click()
  }
}

export default new AdminLoginPage()
