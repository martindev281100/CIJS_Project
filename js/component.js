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
        <input type="email" class="form-control" placeholder="Email" name="email" />
        <div class="error" id="email-error"></div>
      </div>
      <div class="input-wrapper form-group">
        <input type="password" class="form-control" placeholder="Password" name="password" />
        <div class="error" id="password-error"></div>
      </div>

      <div class="form-action input-wrapper">
        <button class="btn btn-primary btn-login cursor-pointer" type="submit">
          Login
        </button>

        <div class="login-by-social-account">
          <div class="text">
            <span>
              Or login with
            </span>
          </div>
          <div class="btn-social-acc">
            <button id="btn_google"><i class="fab fa-google"></i> Google </button>
            <button id="btn_facebook"><i class="fab fa-facebook-square"></i> Facebook </button>
          </div>
        </div>
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
          <li><a href="index.html"><button>Home</button></a></li>
          <li>
            <div class="dropdown">
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                Games
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">3x3</a>
                <a class="dropdown-item" href="#">5x5</a>
                <a class="dropdown-item" href="#">10x10</a>
              </div>
            </div>
          </li>
          <li><a href="#"><button>Blogs</button></a></li>
          <li><a href="#"><button>Contact</button></a></li>
        </ul>
      </div>
      <div class="button-header">
        <button class="btn btn-dark" id="log-in">Log in</button>
        <button class="btn btn-dark" id="sign-out">Sign out</button>
      </div>
    </div>
    <div class="main">
      <h1>the best <text style="color: #990000">games</text> out these</h1>
      <div class="content">
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- info
      </div>
      <button class="btn btn-dark">Read More</button>
    </div>
  </div>`
component.playPage = ` <div class="header">
    <div class="container">
      <div class="logo"><i class="fas fa-gamepad"></i> Tic Tac Toe</div>
      <div class="nav-bar">
        <ul>
          <li><a href="index.html"><button>Home</button></a></li>
          <li>
            <div class="dropdown">
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                Games
              </button>
              <div class="dropdown-menu">
                <button class="dropdown-item" href="#">3x3</button>
                <button class="dropdown-item" href="#">5x5</button>
              </div>
            </div>
          </li>
          <li><a href="#"><button>Blogs</button></a></li>
          <li><a href="#"><button>Contact</button></a></li>
        </ul>
      </div>
      <div class="button-header">
        <button class="btn btn-dark" id="log-in">Log in</button>
        <button class="btn btn-dark" id="sign-out">Sign out</button>
      </div>
    </div>
  </div>

  <div class="board-games" id="board-games">
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
  </div>

  <div class="winning-message" id="winningMessage">
    <div status-messages></div>
    <button id="restartButton">Restart</button>
  </div>`
component.gamePage = `<div class="game-container">
  <div class="header">
    <div class="container">
      <div class="logo"><i class="fas fa-gamepad"></i> Tic Tac Toe</div>
      <div class="nav-bar">
        <ul>
          <li><a href="index.html"><button>Home</button></a></li>
          <li>
            <div class="dropdown">
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                Games
              </button>
              <div class="dropdown-menu">
                <button class="dropdown-item" id="opt3x3">3x3</button>
                <button class="dropdown-item" id="opt5x5">5x5</button>
              </div>
            </div>
          </li>
          <li><a href="#"><button>Blogs</button></a></li>
          <li><a href="#"><button>Contact</button></a></li>
        </ul>
      </div>
      <div class="button-header">
        <button class="btn btn-dark" id="log-in">Log in</button>
        <button class="btn btn-dark" id="sign-out">Sign out</button>
      </div>
    </div>
  </div>

  <div class="main">
    <div class="aside-left">
      <div class="content">
        <h1>tic tac toe</h1>
        <div class="btn-find-match">
          <button><i class="fas fa-user-astronaut"></i><br>Find opponent</button>
          <button><i class="fas fa-user-friends"></i><br>Play with a friend</button>
          <button><i class="fas fa-users"></i><br>Create private tournament</button>
        </div>
      </div>
    </div>

    <div class="aside-right">
      <div class="title">
        <button><i class="fas fa-trophy"></i><br>Ranking</button>
        <button><i class="fas fa-users"></i><br>Player</button>
      </div>
      <div class="info">
        <div class="rank">1.</div>
        <div class="user-name">Shin Ryujin</div>
        <div class="score">1300</div>
      </div>
      <div class="info">
        <div class="rank">2.</div>
        <div class="user-name">Shin Yuna</div>
        <div class="score">1000</div>
      </div>
    </div>
  </div>`