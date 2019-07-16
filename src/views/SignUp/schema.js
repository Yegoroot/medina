export default {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 6,
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: "is required" },
    checked: true
  }
};
