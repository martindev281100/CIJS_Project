const component = {};

component.registerPage = `
 <div class="register-container">
        <form id="register-form">
          <div class="register-header">LOGIN</div>
          <div class="name-wrapper">
            <div class="input-wrapper form-group">
              <input
                type="text"
                class="form-control"
                placeholder="First name"
                name="firstName"
              />
              <div class="error" id="first-name-error"></div>
            </div>
            <div class="input-wrapper form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Last name"
                name="lastName"
              />
              <div class="error" id="last-name-error"></div>
            </div>
          </div>
          <div class="input-wrapper form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
            />
            <div class="error" id="email-error"></div>
          </div>
          <div class="input-wrapper form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
            />
            <div class="error" id="password-error"></div>
          </div>
          <div class="input-wrapper form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
            <div class="error" id="confirm-password-error"></div>
          </div>
          <div class="form-action input-wrapper">
            <button
              class="btn btn-primary btn-register cursor-pointer"
              type="submit"
            >
              Register
            </button>
            <div class="redirect">
              Already have an account?
              <span id="redirect-to-login" class="cursor-pointer">Login</span>
            </div>
          </div>
        </form>
      </div>`

component.loginPage = `
  <div class="login-container">
    <form id="login-form">
    <div class="login-header">LOGIN</div>
    <div class="input-wrapper form-group">
      <input
        type="email"
        class="form-control"
        placeholder="Email"
        name="email"
      />
      <div class="error" id="email-error"></div>
    </div>
    <div class="input-wrapper form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        name="password"
      />
      <div class="error" id="password-error"></div>
    </div>

    <div class="form-action input-wrapper">
      <button
        class="btn btn-primary btn-login cursor-pointer"
        type="submit"
      >
        Login
      </button>
      <div class="redirect">
          Don't have an account?
        <span id="redirect-to-register" class="cursor-pointer">Register</span>
      </div>
    </div>
  </form>   
  </div>`

component.homePage = `
  <div class="home-page">
    <div class="header">
        <div class="container">
            <div class="logo">
                <i class="fas fa-gamepad"></i> Tic Tac Toe
            </div>
            <div class="nav-bar">
                <ul>
                    <li><button>Home</button></li>
                    <li><button>Games</button></li>
                    <li><button>Blogs</button></li>
                    <li><button>Contact</button></li>
                </ul>
            </div>
            <div class="sign-in-btn">
                <button class="btn">Login/Register</button>
            </div>
        </div>
    </div>

    <div class="main">
        <h1>the best <text style="color:#990000;">games</text> out these</h1>
        <div class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. quaerat! Voluptates dolores impedit adipisci mollitia ea tempora?</div>
        <button class="btn">Read More</button>
    </div>
  </div>`