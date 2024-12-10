export const validation = (data) => {
    const errors = {};
  
    // Check if email is provided and valid
    if (data.hasOwnProperty("email")) {
      if (!data.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email is invalid";
      }
    }

    // Check if first name is provided
    if (data.hasOwnProperty("first_name")) {
      if (!data.first_name.trim()) {
        errors.first_name = "First name is required";
      }
    }

    // Check if user name is provided
    if (data.hasOwnProperty("name")) {
      if (!data.name.trim()) {
        errors.name = "username is required";
      }
    }

    // Check if password is provided and meets length criteria
    if (data.hasOwnProperty("password")) {
      if (!data.password.trim()) {
        errors.password = "Password is required";
      } else if (data.password.length < 8 || data.password.length > 10) {
        errors.password = "Password must be between 8 to 10 characters long";
      }
    }
  
    return errors;
  };