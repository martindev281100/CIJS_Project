const component = {};

component.register = `
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
      </div>`;
