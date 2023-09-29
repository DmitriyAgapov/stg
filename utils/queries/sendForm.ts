export const sendForm = `mutation SendForm {
  createFormSubmission(data: {
    Email: "prweb2012@gmail.com",
    Name: "Test",
    Phone: "3234324324"    
  }) {
    data {
      id
    }
  }
}`
