const component = {};

component.registerPage = `
<div class="register-container">
      <form id="register-form">
        <div class="register-header">REGISTER</div>
        <div class="input-wrapper form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            name="userName"
          />
          <div class="error" id="user-name-error"></div>
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
    </div>`;

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
  </div>`;

component.homePage = `
  <div class="home-page">
    <div class="header">
      <div class="container">
        <div class="logo"><i class="fas fa-gamepad"></i> Tic Tac Toe</div>
        <div class="nav-bar">
          <ul>
            <li><button>Home</button></li>
            <li><div class="dropdown">
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                Dropdown button
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Link 1</a>
                <a class="dropdown-item" href="#">Link 2</a>
                <a class="dropdown-item" href="#">Link 3</a>
              </div>
            </div></li>
            <li><button>Blogs</button></li>
            <li><button>Contact</button></li>
          </ul>
        </div>
        <div class="button-header">
          <button class="btn btn-dark" id="log-in">Log in</button>
          <button class="btn btn-dark" id="sign-out">Sign out</button>
        </div>
      </div>
    </div>

    <div class="main">
      <h1>the best <text style="color: #990000">games</text> out these</h1>
      <div class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. quaerat!
        Voluptates dolores impedit adipisci mollitia ea tempora?
      </div>
      <button class="btn btn-dark">Read More</button>
    </div>
  </div>`;
