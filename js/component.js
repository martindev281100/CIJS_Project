const component = {};

component.registerPage = `
<div class="register-container">
<form id="register-form">
  <div class="register-header">REGISTER</div>
  
  <div class="input-wrapper form-group">
    <input type="text" class="form-control" placeholder="Username" name="userName"/>
    <div class="error" id="user-name-error"></div>
  </div>

  <div class="input-wrapper form-group">
    <input type="email" class="form-control" placeholder="Email" name="email"/>
    <div class="error" id="email-error"></div>
  </div>

  <div class="input-wrapper form-group">
    <input type="password" class="form-control" placeholder="Password" name="password"/>
    <div class="error" id="password-error"></div>
  </div>

  <div class="input-wrapper form-group">
    <input type="password" class="form-control" placeholder="Confirm Password" name="confirmPassword"/>
    <div class="error" id="confirm-password-error"></div>
  </div>

  <div class="form-action input-wrapper">
    <button class="btn btn-primary btn-register cursor-pointer" type="submit">Register</button>
    <div class="redirect">Already have an account?
      <span id="redirect-to-login" class="cursor-pointer">Login</span>
    </div>
  </div>
</form>
</div>
`;

component.loginPage = `
<div class="login-container">
<form id="login-form">
  <div class="login-header">LOGIN</div>

  <div class="input-wrapper form-group">
    <input type="email" class="form-control" placeholder="Email" name="email"/>
    <div class="error" id="email-error"></div>
  </div>

  <div class="input-wrapper form-group">
    <input type="password" class="form-control" placeholder="Password" name="password"/>
    <div class="error" id="password-error"></div>
  </div>

  <div class="form-action input-wrapper">
    <button class="btn btn-primary btn-login cursor-pointer" type="submit">Login</button>

    <div class="login-by-social-account">
      <div class="text"><span>Or login with</span></div>
      <div class="btn-social-acc">
        <button id="btn_google"><i class="fab fa-google"></i> Google </button>
        <button id="btn_facebook"><i class="fab fa-facebook-square"></i> Facebook </button>
      </div>
    </div>
    
    <div class="redirect">Don't have an account?
      <span id="redirect-to-register" class="cursor-pointer">Register</span>
    </div>
  </div>
</form>
</div>
`;

component.homePage = `
<div class="home-page">
<div class="header">
  <div class="container">
  <a class="logo" href="index.html"><i class="fas fa-gamepad"></i> Tic Tac Toe</a>
    <div class="nav-bar">
      <ul>
        <li><a href="index.html"><button>Home</button></a></li>
        <li>
          <div class="dropdown">
            <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">Games</button>
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
    </div>
  </div>
</div>

<div class="main">
  <h1>the best <text style="color: #990000">games</text> out there</h1>
  <div class="content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus temporibus facilis natus sunt, 
  soluta facere, vel in non aliquam quasi optio. Laudantium adipisci atque corrupti eius repellat enim molestias!</div>
  <button class="btn btn-dark">Read More</button>
</div>
</div>
`

component.gamePage = `
<div class="game-container">
<div class="header">
  <div class="container">
  <a class="logo" href="index.html"><i class="fas fa-gamepad"></i> Tic Tac Toe</a>

    <div class="nav-bar">
      <ul>
        <li><a href="index.html"><button>Home</button></a></li>
        <li><a href="#"><button>Blogs</button></a></li>
        <li><a href="#"><button>Contact</button></a></li>
      </ul>
    </div>

    <div class="dropdown">
      <button type="button" data-toggle="dropdown" class="notification">
        <i class="fas fa-bell"></i>
        <span class="badge"></span>
      </button>
      <div class="dropdown-menu" id="listNotification"></div>
    </div>

    <div class="button-header">
      <button class="btn btn-dark" id="sign-out">Sign out</button>
    </div>
  </div>
</div>

<div class="main">
  <div class="aside-left">
    <div class="content">
      <h1>tic tac toe</h1>
      <div class="btn-find-match">
        <button type="button" data-toggle="modal" data-target="#myModalGuide"><i class="fas fa-user-astronaut"></i><br>Guide</button>
        <!-- The Modal -->
        <div class="modal" id="myModalGuide">
          <div class="modal-dialog">
            <div class="modal-content">
            
              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title" style="color:black;">Guide For Player</h4>
                <div type="button" class="close" data-dismiss="modal">&times;</div>
              </div>
              
              <!-- Modal body -->
              <div class="modal-body">
                <img src="./img/guide.PNG" width="480">
              </div>
              
              <!-- Modal footer -->
              <div class="modal-footer">
                <div type="button" class="btn btn-danger" data-dismiss="modal">Close</div>
              </div>
              
            </div>
          </div>
        </div>
        <button><i class="fas fa-user-friends"></i><br>Our Team</button>
        <button><i class="fas fa-users"></i><br>Create private tournament</button>
      </div>
    </div>
  </div>
  
  <div class="aside-right">
    <div class="title">
      <button class="ranking current"><i class="fas fa-trophy"></i><br>Ranking</button>
      <button class="player"><i class="fas fa-users"></i><br>Player</button>
    </div>
    <div class="rankingList"></div>
    <div class="playerList"></div>
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="color: black;">Type Of Games</h4>
            <div type="button" class="close" data-dismiss="modal">&times;</div>
          </div>
          <div class="modal-body">
          <div class="dropdown-item opt3x3 opt" data-dismiss="modal">3x3</div>
            <div class="dropdown-item opt5x5 opt" data-dismiss="modal">5x5</div>
            <div class="dropdown-item opt10x10 opt" data-dismiss="modal">10x10</div>
          </div>
          <div class="modal-footer">
            <div type="button" class="btn btn-danger" data-dismiss="modal">Close</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
`

component.playPage = `
<div class="header">
<div class="container">
  <a class="logo" href="index.html"><i class="fas fa-gamepad"></i> Tic Tac Toe</a>
  <div class="nav-bar">
    <ul>
      <li><a href="index.html"><button>Home</button></a></li>
      <li><a href="#"><button>Blogs</button></a></li>
      <li><a href="#"><button>Contact</button></a></li>
    </ul>
  </div>
</div>
</div>

    <div class="main-game">
      <div class="current-player">
        <div class="name">Player 1</div>
        <div class="point">Point: 1000</div>
      </div>
      <div class="board-games" id="board-game">
      </div>
      <div class="guest-player">
        <div class="name">Player 2</div>
        <div class="point">Point: 1000</div>
      </div>
    </div>

<div class="winning-message" id="winningMessage">
<div status-messages></div>
<button id="restartButton">Restart</button>
</div>
`